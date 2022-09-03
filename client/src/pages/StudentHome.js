import React from "react";
import Student from "./Student";
import Cart from "../components/Cart";
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

function StudentHome() {
	const { loading, error, data } = useQuery(GET_MENU);
	const menuList = data?.menu;
	return (
		<div>
			<CartProvider>
				<Student />
				<Cart menuList={!error ? menuList : []} />
			</CartProvider>
		</div>
	);
}

export default StudentHome;
