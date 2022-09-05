import React from "react";
import StudentHome from "../components/Student/StudentHome.js";
import Cart from "../components/Student/Cart";
import { CartProvider } from "react-use-cart";
import { gql, useQuery } from "@apollo/client";
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

function Student() {
	const { error, data } = useQuery(GET_MENU);
	const menuList = data?.menu;
	return (
		<div>
			<CartProvider>
				<StudentHome />
				<Cart menuList={!error ? menuList : []} />
			</CartProvider>
		</div>
	);
}

export default Student;
