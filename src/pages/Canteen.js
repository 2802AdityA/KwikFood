import { useOutletContext } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import ReadRow from "../components/Canteen/ReadRow";
import EditRow from "../components/Canteen/EditRow";
import "../styles/Canteen/modifymenu.css";

const GET_MENU = gql`
query showMenu($email: String!){
	menu(where: {email: {_eq: $email}}){
	  id
	  name
	  price
	  quantity
	  email
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
	const { user } = useOutletContext();
	const [email, setEmail] = useState("");
	useEffect(() => {
		setEmail(user.email); // eslint-disable-next-line
	}, []);
	const { data, error } = useQuery(GET_MENU, { variables: { email } });

	// console.log(data ? data : error);

	const menuList = data?.menu;
	const [menu, setMenu] = useState(menuList);
	function refreshPage() {
		window.location.reload(false);
	}

	// add new items to menu
	const [insertItem] = useMutation(INSERT_MULTIPLE_ITEMS_MUTATION);

	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [quantity, setQuantity] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await insertItem({
				variables: {
					menu: {
						name: name,
						price: price,
						quantity: quantity,
						email: email
					}
				}
			})
		}
		catch (err) {
			console.log(err);
		}
		refreshPage()
	}

	// const [addMenuData, setAddMenuData] = useState({
	// 	name: "",
	// 	price: "",
	// 	quantity: "",
	// });

	// const handleAddMenuChange = (event) => {
	// 	event.preventDefault();
	// 	const fieldName = event.target.getAttribute("name");
	// 	const fieldValue = event.target.value;
	// 	const newMenuData = { ...addMenuData };
	// 	newMenuData[fieldName] = fieldValue;
	// 	setAddMenuData(newMenuData);
	// };

	// const handleAddMenuSubmit = async (event) => {
	// 	event.preventDefault();
	// 	try {
	// 		const newDetail = await insertItem({
	// 			variables: {
	// 				menu: {
	// 					name: addMenuData.name,
	// 					price: addMenuData.price,
	// 					quantity: addMenuData.quantity,
	// 				},
	// 			},
	// 		});
	// 		const newDetails = [...menu, newDetail];
	// 		setMenu(newDetails);
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// 	refreshPage();
	// };

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
			console.log("no");
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
			<button className="add-menu" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
				<i className="fa-solid fa-plus"></i>Add Menu
			</button>
			<div className="modal fade " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="staticBackdropLabel">ADD MENU</h5>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<form onSubmit={handleSubmit}>
								<div className="mb-3">
									<label className="col-form-label">Item Name:</label>
									<input className="form-control" type="text" placeholder="Item Name" value={name} onChange={(e) => setName(e.target.value)}></input>
								</div>
								<div className="mb-3">
									<label className="col-form-label">Price of Item:</label>`
									<input className="form-control" type="text" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)}></input>
								</div>
								<div className="mb-3">
									<label className="col-form-label">Quantity Available:</label>
									<input className="form-control" type="text" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)}></input>
								</div>
								<div className="modal-footer">
									<button type="submit" className=" btn btn-outline-primary">Add Menu</button>
								</div>
							</form>
						</div>

					</div>
				</div>
			</div>
			{!data ? (
				"no data"
			) : (
				<>
					<form onSubmit={handleEditMenuSubmit}>
						<table className="table">
							<thead>
								<tr className="row table-secondary">
									<th className="col">Item Name</th>
									<th className="col">Price</th>
									<th className="col">Quantity</th>
									<th className="col">Actions</th>
								</tr>
							</thead>
							<tbody>
								{!error
									? menuList?.map((itemDetails) => {
										return (
											<>
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
											</>
										);
									})
									: "Something went wrong, Check back after sometime "}
							</tbody>
						</table>
					</form>
				</>
			)}
		</div>
	);
};

export default Canteen;