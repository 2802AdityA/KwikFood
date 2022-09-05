import React from "react";
import { useOutletContext } from "react-router-dom";
import styles from "../../styles/pages/Student.module.css";
import { gql, useQuery } from "@apollo/client";
import StudentMenu from "./StudentMenu";
const GET_MENU = gql`
	query GetMenu {
		menu {
			id
			name
			price
			quantity
		}
	}
`;

const StudentHome = () => {
	const { error, data } = useQuery(GET_MENU);
	const menuList = data?.menu;

	const { user } = useOutletContext();

	return (
		<>
			<div>
				<h2 className={styles.title}>Order Your Meal</h2>
				<p className={styles["welcome-text"]}>
					Welcome, {user?.metadata?.firstName || "stranger"}{" "}
					<span role="img" alt="hello">
						👋
					</span>
				</p>
			</div>
			<div>
				{!data ? (
					"no data"
				) : (
					<table className="table">
						<thead>
							<tr className="row">
								<th className="col">Name</th>
								<th className="col">Price</th>
								<th className="col">Available Quantity</th>
								<th className="col">Actions</th>
							</tr>
						</thead>
						<tbody>
							{!error
								? menuList?.map((itemDetails) => {
										return (
											<StudentMenu
												key={itemDetails.id}
												itemDetails={itemDetails}
											/>
										);
								  })
								: "Something went wrong, Check back after sometime "}
						</tbody>
					</table>
				)}
			</div>
		</>
	);
};

export default StudentHome;
