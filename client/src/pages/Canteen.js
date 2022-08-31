import React, { useEffect, useState } from "react";
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
	update_menu_many (
	  updates: [
		{ where: { id: { _eq: $id} },
		  _set: $changes
		}
	  ]
	) {
	  affected_rows
	  returning{
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

	// add new items to menu
	const [insertItem] = useMutation(INSERT_MULTIPLE_ITEMS_MUTATION);

	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [quantity, setQuantity] = useState("");

	const handleName = (e) => {
		e.preventDefault();
		setName(e.target.value);
	}

	const handlePrice = (e) => {
		e.preventDefault();
		setPrice(e.target.value);
	}

	const handleQuantity = (e) => {
		e.preventDefault();
		setQuantity(e.target.value);
	}

	function refreshPage() {
		window.location.reload(false);
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await insertItem({
				variables: {
					menu: {
						name: name,
						price: price,
						quantity: quantity
					}
				}
			})
		}
		catch (err) {
			console.log(err);
			alert("Some Error Occurred!");
			console.log(err);
		}
	}

	// update single row
	const [row, setRow] = useState(null);

	const handleRowChange = (e, item)=>{
		e.preventDefault();
		setRow(item.id);
	}
	const [updateItem] = useMutation(UPDATE_MENU);

	const [newName, setNewName] = useState("");
	const [newPrice, setNewPrice] = useState("");
	const [newQuantity, setNewQuantity] = useState("");

	const handleNewName = (e)=>{
		setNewName(e.target.value);
	}

	const handleNewPrice = (e)=>{
		setNewPrice(e.target.value);
	}

	const handleNewQuantity = (e)=>{
		setNewQuantity(e.target.value);
	}

	const handleUpdate = async (e)=>{
		e.preventDefault();
		try{
			await updateItem({
				variables: {
					menu: {
						name: newName,
						price: newPrice,
						quantity: newQuantity
					}
				}
			})
		}
		catch(err){
			console.log(err);
			alert("Some Error Occurred!");
			console.log(err);
		}
		refreshPage();
	}

	return (
		<div>
			{!data ? ("no data") : (<form onSubmit={handleSubmit}><table>
				<tr>
					<th>Name</th>
					<th>Price</th>
					<th>Quantity</th>
					<th>Update</th>
				</tr>
				{!error
					? menuList?.map((itemDetails) => {
						return (
							<div>
								{(row == itemDetails.id) ? <EditRow newName={newName} handleNewName={handleNewName} newPrice={newPrice} handleNewPrice={handleNewPrice} newQuantity={newQuantity} handleNewQuantity={handleNewQuantity} handleUpdate = {handleUpdate} /> : <ReadRow itemDetails={itemDetails} handleEditClick={handleRowChange} />}
							</div>
						);
					})
					: "Something went wrong, Check back after sometime "}
			</table></form>)}

			<div>
				<form onSubmit={handleSubmit}>
					<input type="text" placeholder="Item Name" value={name} onChange={handleName}></input>
					<input type="text" placeholder="Item Price" value={price} onChange={handlePrice}></input>
					<input type="text" placeholder="Item Quantity" value={quantity} onChange={handleQuantity}></input>
					<button type="submit">Add Item</button>
				</form>
			</div>
		</div>
	);
};

export default Canteen;
