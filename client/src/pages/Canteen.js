import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";

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

const INSERT_MULTIPLE_ITEMS_MUTATION = gql`
	mutation insert_multiple_items($menu: [menu_insert_input!]!) {
		insert_menu(objects: $menu) {
			returning {
				id
				name
				price
				quantity
			}
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

	const [insertItem] = useMutation(INSERT_MULTIPLE_ITEMS_MUTATION);

	const [itemNo, setItemNo] = useState("");
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [quantity, setQuantity] = useState("");

	const handleItemNo = (e) => {
		e.preventDefault();
		setItemNo(e.target.value);
	};

	const handleName = (e) => {
		e.preventDefault();
		setName(e.target.value);
	};

	const handlePrice = (e) => {
		e.preventDefault();
		setPrice(e.target.value);
	};

	const handleQuantity = (e) => {
		e.preventDefault();
		setQuantity(e.target.value);
	};

	function refreshPage() {
		window.location.reload(false);
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await insertItem({
				variables: {
					menu: {
						id: itemNo,
						name: name,
						price: price,
						quantity: quantity,
					},
				},
			});
		} catch (err) {
			console.log(err);
			alert("Some Error Occurred!");
		}
		refreshPage();
	};

	return (
		<div>
			<div>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder="Item No."
						value={itemNo}
						onChange={handleItemNo}
					></input>
					<input
						type="text"
						placeholder="Item Name"
						value={name}
						onChange={handleName}
					></input>
					<input
						type="text"
						placeholder="Item Price"
						value={price}
						onChange={handlePrice}
					></input>
					<input
						type="text"
						placeholder="Item Quantity"
						value={quantity}
						onChange={handleQuantity}
					></input>
					<button type="submit">Add Item</button>
				</form>
			</div>
			{!data ? (
				"no data"
			) : (
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
			)}
		</div>
	);
};

export default Canteen;
