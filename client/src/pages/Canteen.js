import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import ReadRow from "../components/Canteen/ReadRow";
import EditRow from "../components/Canteen/EditRow";
import CurrentOrder from "../components/Canteen/CurrentOrders";

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
	mutation update_many_foodItems($id: uuid, $changes: menu_set_input) {
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

const DELETE_MENU_ITEM = gql`
	mutation delete_a_foodItem($id: uuid!) {
		delete_menu_by_pk(id: $id) {
			id
			name
			price
			quantity
		}
	}
`;

const Canteen = () => {
	// eslint-disable-next-line
	const { loading, error, data } = useQuery(GET_MENU);
	const menuList = data?.menu;
	const [menu, setMenu] = useState(menuList);

	// add new items to menu
	const [insertItem] = useMutation(INSERT_MULTIPLE_ITEMS_MUTATION);

	const [addMenuData, setAddMenuData] = useState({
		name: "",
		price: "",
		quantity: "",
	});

	const handleAddMenuChange = (event) => {
		event.preventDefault();
		const fieldName = event.target.getAttribute("name");
		const fieldValue = event.target.value;
		const newMenuData = { ...addMenuData };
		newMenuData[fieldName] = fieldValue;
		setAddMenuData(newMenuData);
	};

	function refreshPage() {
		window.location.reload(false);
	}

	const handleAddMenuSubmit = async (event) => {
		event.preventDefault();
		try {
			const newDetail = await insertItem({
				variables: {
					menu: {
						name: addMenuData.name,
						price: addMenuData.price,
						quantity: addMenuData.quantity,
					},
				},
			});
			const newDetails = [...menu, newDetail];
			setMenu(newDetails);
		} catch (err) {
			console.log(err);
		}
		refreshPage();
	};

	// update menu items
	const [updateItem] = useMutation(UPDATE_MENU);
	const [editMenuData, setEditMenuData] = useState({
		name: "",
		price: "",
		quantity: "",
	});

	const [editMenuId, setEditMenuId] = useState(null);

	const handleEditMenuChange = (event) => {
		event.preventDefault();
		const fieldName = event.target.getAttribute("name");
		const fieldValue = event.target.value;
		const newMenuData = { ...editMenuData };
		newMenuData[fieldName] = fieldValue;
		setEditMenuData(newMenuData);
	};

	const handleEditMenuSubmit = async (event) => {
		event.preventDefault();
		try {
			const editedMenu = await updateItem({
				variables: {
					id: editMenuId,
					changes: {
						name: editMenuData.name,
						price: editMenuData.price,
						quantity: editMenuData.quantity,
					},
				},
			});
			const newMenu = [...menu];
			const index = menu.findIndex((menu) => menu.id === editMenuId);
			newMenu[index] = editedMenu;
			setMenu(newMenu);
			setEditMenuId(null);
		} catch (err) {
			console.log(err);
		}
		refreshPage();
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

	// delete menu item
	const [deleteItem] = useMutation(DELETE_MENU_ITEM);
	const handleDeleteClick = async (menuId) => {
		try {
			await deleteItem({
				variables: {
					id: menuId,
				},
			});
			const newMenu = [...menu];
			const index = menu.findIndex((menu) => menu.id === menuId);
			newMenu.splice(index, 1);
			setMenu(newMenu);
		} catch (err) {
			console.log(err);
		}
		refreshPage();
	};

	return (
		<div>
			{!data ? (
				"no data"
			) : (
				<form onSubmit={handleEditMenuSubmit}>
					<table className="table">
						<thead>
							<tr className="row">
								<th className="col">Name</th>
								<th className="col">Price</th>
								<th className="col">Quantity</th>
								<th className="col">Actions</th>
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
						<tfoot>
							<tr className="row">
								<div>
									<form onSubmit={handleAddMenuSubmit}>
										<td className="col">
											<input
												className="form-control"
												type="text"
												name="name"
												required="required"
												onChange={handleAddMenuChange}
											/>
										</td>
										<td className="col">
											<input
												className="form-control"
												type="text"
												name="price"
												required="required"
												onChange={handleAddMenuChange}
											/>
										</td>
										<td className="col">
											<input
												className="form-control"
												type="text"
												name="quantity"
												required="required"
												onChange={handleAddMenuChange}
											/>
										</td>
										<td className="col">
											<button className="btn" type="submit">
												Add
											</button>
										</td>
									</form>
								</div>
							</tr>
						</tfoot>
					</table>
				</form>
			)}
			<CurrentOrder/>
		</div>
	);
};

export default Canteen;
