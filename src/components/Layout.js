import styles from "../styles/components/Layout.module.css";

// import logo from "../assets/KwikFoodLogo.png";

import { useState, useEffect } from "react";
import { useSignOut, useUserId } from "@nhost/react";
import { gql, useQuery } from "@apollo/client";
import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import {
	ChevronDownIcon,
	HomeIcon,
	LogoutIcon,
	UserIcon,
} from "@heroicons/react/outline";

import Avatar from "./Avatar";

const GET_USER_QUERY = gql`
	query GetUser($id: uuid!) {
		user(id: $id) {
			id
			email
			displayName
			metadata
			avatarUrl
		}
	}
`;
const check_canteen_user = gql`
query canteenUser($email: citext) {
	canteen_email(where: {owner_email: {_eq: $email}}){
	  owner_email
	}
  }  
`
const Layout = () => {
	const id = useUserId();
	const { signOut } = useSignOut();
	const { loading, error, data } = useQuery(GET_USER_QUERY, {
		variables: { id },
		skip: !id,
	});
	const user = data?.user;
	const { data: canteen_data, loading: canteen_loading, error: canteen_error } = useQuery(check_canteen_user, { variables: { email: user?.email } });
	if (canteen_loading) return <p>Loading...</p>
	if (canteen_error) return <p>Error</p>
	const check = () => {
		if (canteen_data.canteen_email.length === 0) {
			return false;
		}
		else {
			return true;
		}
	}


	const menuItems = [
		{
			label: "Dashboard",
			href: "/",
			icon: HomeIcon,
		},
		{
			label: "Profile",
			href: "/profile",
			icon: UserIcon,
		},
		{
			label: "Logout",
			onClick: signOut,
			icon: LogoutIcon,
		},
	];

	return (
		<div>
			<header className={styles.header}>
				<div className={styles["header-container"]}>
					<Link to="/">
						<img className={styles.logo} src={process.env.PUBLIC_URL + "logo-1.png"} alt="logo" />
					</Link>

					{
						check() ? (<div className={styles.buttons}>
							<Link to="/canteen" className={styles.linkitem}>Menu</Link>
							<Link to="/studentOrders" className={styles.linkitem}>Orders</Link>
						</div>) : (
							<div className={styles.buttons}>
								<Link to="/canteens" className={styles.linkitem}>Canteens</Link>
								<Link to="/orders" className={styles.linkitem}>Orders</Link>
							</div>
						)
					}


					<Menu as="div" className={styles.menu}>
						<Menu.Button className={styles["menu-button"]}>
							<Avatar src={user?.avatarUrl} alt={user?.displayName} />
							<ChevronDownIcon />
						</Menu.Button>
						<Transition
							as={Fragment}
							enter={styles["menu-transition-enter"]}
							enterFrom={styles["menu-transition-enter-from"]}
							enterTo={styles["menu-transition-enter-to"]}
							leave={styles["menu-transition-leave"]}
							leaveFrom={styles["menu-transition-leave-from"]}
							leaveTo={styles["menu-transition-leave-to"]}
						>
							<Menu.Items className={styles["menu-items-container"]}>
								<div className={styles["menu-header"]}>
									<Avatar src={user?.avatarUrl} alt={user?.displayName} />
									<div className={styles["user-details"]}>
										<span>{user?.displayName}</span>
										<span className={styles["user-email"]}>{user?.email}</span>
									</div>
								</div>

								<div className={styles["menu-items"]}>
									{menuItems.map(({ label, href, onClick, icon: Icon }) => (
										<div key={label} className={styles["menu-item"]}>
											<Menu.Item>
												{href ? (
													<Link to={href}>
														<Icon />
														<span>{label}</span>
													</Link>
												) : (
													<button onClick={onClick}>
														<Icon />
														<span>{label}</span>
													</button>
												)}
											</Menu.Item>
										</div>
									))}
								</div>
							</Menu.Items>
						</Transition>
					</Menu>
				</div>
			</header>

			<main className={styles.main}>
				<div className={styles["main-container"]}>
					{error ? (
						<p>Something went wrong. Try to refresh the page.</p>
					) : !loading ? (
						<Outlet context={{ user }} />
					) : null}
				</div>
			</main>
		</div >
	);
};

export default Layout;
