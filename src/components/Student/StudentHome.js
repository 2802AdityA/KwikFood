import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useOutletContext } from "react-router-dom";

// eslint-disable-next-line
import "../../styles/pages/Student.module.css";

import StudentMenu from "./StudentMenu";
import "../../styles/Student/StudentHome.css";

const GET_MENU = gql`
	query MyQuery($email: citext!) {
		menu(where: { email: { _eq: $email } }) {
			id
			name		
			price		
			quantity		
			email
		}
	}
`;

const StudentHome = (props) => {
	const email = props.email;

	const { data, error } = useQuery(GET_MENU, {
		variables: { email },
	});
	const menuList = data?.menu;

	const { user } = useOutletContext();

	return (
		<div className="student-home">
			<h1 className="heading"> Order Your Meal </h1>
			<p className="call-to-action">
				Welcome, {user?.metadata?.firstName || "stranger"}{" "}
			</p>
			<section className="banner">
				<div className="content">
					<img  src="https://img.freepik.com/free-photo/club-sandwich-with-side-french-fries_140725-1744.jpg?w=900&t=st=1679598724~exp=1679599324~hmac=47700de77a416564e09446366ee19e7f9d2c28c0dbf49352f777e079c2706a3c"/>
				</div>
				
				{/* eslint-disable-next-line */}
				<img  className="food" src="https://images.unsplash.com/photo-1460306855393-0410f61241c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format" />
			</section>
			<div>
				{!data ? (
					"no data"
				) : (
					<div className="menu-card">
						<div className="card-body">
							{/* <form className="app-search">
								<input type="text" className="form-control" placeholder="Search" />
							</form> */}
							<table className="table ">
								<thead>
									<tr className="row">
										<th className="col">Item Name</th>
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
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default StudentHome;
