import React, { useEffect } from "react";
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
const Canteen = () => {
	const { loading, error, data } = useQuery(GET_MENU);
	const menuList = data?.menu;

	// FOR CHECKING
	console.log(loading);
	console.log(error);
	console.log(data);

	return (
		<div>
			<table>
				<tr>
					<th>S No.</th>
					<th>Name</th>
					<th>Price</th>
					<th>Quantity</th>
				</tr>
				{!error
					? menuList?.map((itemDetails) => {
							return (
								<tr>
									<th>{itemDetails.id}</th>
									<th>{itemDetails.name}</th>
									<th>{itemDetails.price}</th>
									<th>{itemDetails.quantity}</th>
								</tr>
							);
					  })
					: "Something went wrong, Check back after sometime "}
			</table>
		</div>
	);
};

export default Canteen;
