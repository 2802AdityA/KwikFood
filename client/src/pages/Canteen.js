import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import ReadRow from "../components/ReadRow";
import EditRow from "../components/EditRow";

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
				name
				price
				quantity
			}
		}
	}
`;

const UPDATE_MENU = gql`
	mutation update_many_foodItems($id: Int, $changes: menu_set_input) {
		update_menu_many(
			updates: [{ where: { id: { _eq: $id } }, _set: $changes }]
		) {
			affected_rows
			returning {
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
	const [menu, setMenu] = useState(menuList);
	// add new items to menu
	const [insertItem] = useMutation(INSERT_MULTIPLE_ITEMS_MUTATION);
	const [editMenuData, setEditMenuData] = useState({
		name: "",
		price: "",
		quantity: "",
	});
	const [addMenuData, setAddMenuData] = useState({
		name: "",
		price: "",
		quantity: "",
	});

	const [editMenuId, setEditMenuId] = useState(null);

	const handleAddMenuChange = (event) => {
		event.preventDefault();

		const fieldName = event.target.getAttribute("name");
		const fieldValue = event.target.value;

		const newMenuData = { ...addMenuData };
		newMenuData[fieldName] = fieldValue;

		setAddMenuData(newMenuData);
	};

	const handleEditMenuChange = (event) => {
		event.preventDefault();

		const fieldName = event.target.getAttribute("name");
		const fieldValue = event.target.value;

		const newMenuData = { ...editMenuData };
		newMenuData[fieldName] = fieldValue;

		setEditMenuData(newMenuData);
	};

	const handleAddMenuSubmit = (event) => {
		event.preventDefault();

		const newDetail = {
			name: addMenuData.name,
			price: addMenuData.price,
			quantity: addMenuData.quantity,
		};

		const newDetails = [...menu, newDetail];
		setMenu(newDetails);
	};

	const handleEditMenuSubmit = (event) => {
		event.preventDefault();

		const editedMenu = {
			name: editMenuData.name,
			price: editMenuData.price,
			quantity: editMenuData.quantity,
		};
		const newMenu = [...menu];

		const index = menu.findIndex((menu) => menu.id === editMenuId);

		newMenu[index] = editedMenu;

		setMenu(newMenu);
		setEditMenuId(null);
	};

	const handleEditClick = (event, menu) => {
		event.preventDefault();
		setEditMenuId(menu.id);

		const menuValues = {
			name: menu.name,
			price: menu.price,
			quantity: menu.quantity,
		};

		setEditMenuData(menuValues);
	};

	const handleCancelClick = () => {
		setEditMenuId(null);
	};

	const handleDeleteClick = (menuId) => {
		const newMenu = [...menu];

		const index = menu.findIndex((menu) => menu.id === menuId);

		newMenu.splice(index, 1);

		setMenu(newMenu);
	};

	return (
		<div>
			{!data ? (
				"no data"
			) : (
				<form onSubmit={handleEditMenuSubmit}>
					<table>
						<thead>
							<tr>
								<th>Name</th>
								<th>Price</th>
								<th>Quantity</th>
								<th>Update</th>
							</tr>
						</thead>
						<tbody>
							{!error
								? menuList?.map((itemDetails) => {
										return (
											<div>
												{editMenuId === itemDetails.id ? (
													<EditRow
														editMenuData={editMenuData}
														handleEditMenuChange={handleEditMenuChange}
														handleCancelClick={handleCancelClick}
													/>
												) : (
													<ReadRow
														itemDetails={itemDetails}
														handleEditClick={handleEditClick}
														handleDeleteClick={handleDeleteClick}
													/>
												)}
											</div>
										);
								  })
								: "Something went wrong, Check back after sometime "}
						</tbody>
					</table>
				</form>
			)}
			<div>
				<form onSubmit={handleAddMenuSubmit}>
					<input
						className="form-control"
						type="text"
						name="name"
						required="required"
						onChange={handleAddMenuChange}
					/>
					<input
						className="form-control"
						type="text"
						name="price"
						required="required"
						onChange={handleAddMenuChange}
					/>
					<input
						className="form-control"
						type="text"
						name="quantity"
						required="required"
						onChange={handleAddMenuChange}
					/>
					<button type="submit">Add</button>
				</form>
			</div>
		</div>
	);
};

export default Canteen;
