import React from "react";
import StudentHome from "../components/Student/StudentHome.js";
import Cart from "../components/Student/Cart";
import { CartProvider } from "react-use-cart";
import { gql, useQuery } from "@apollo/client";


const GET_MEN = gql`
query MyQuery($_eq: citext! ) {
	menu(where: {email: {_eq: $_eq}}) {
	  id
	  price
	  quantity
	  name
	}
  }
`;

function Student({ email }) {
	const { error, data } = useQuery(GET_MEN, { variables: { email } });
	console.log(data);
	const menuList = data?.menu;
	console.log(menuList);
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
