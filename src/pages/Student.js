import React from "react";
import StudentHome from "../components/Student/StudentHome.js";
import Cart from "../components/Student/Cart";
import { CartProvider } from "react-use-cart";
import { gql, useQuery } from "@apollo/client";
import { useParams, useLocation } from 'react-router-dom';

// GET MENU USING CANTEEN EMAIL
const GET_MENU = gql`
	query MyQuery($email: citext!) {
		menu(where: { email: { _eq: $email } }) {
			email
			id
			name		
			price		
			quantity						}
	}
`;

const Student = () => {
	const { canteenName } = useParams();
	const location = useLocation();
	const email = location.state?.email;

	// Get data of menu from canteen email
	const { data, error } = useQuery(GET_MENU, {
		variables: { email },
	});
	// console.log(data);
	const menuList = data?.menu;
	return (
		<div>
			<CartProvider>
				<StudentHome email={email} />
				<Cart menuList={!error ? menuList : []} />
			</CartProvider>
		</div>
	);
}

export default Student;
