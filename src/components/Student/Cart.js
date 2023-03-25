import React from "react";
import { useOutletContext } from "react-router-dom";
import { useCart } from "react-use-cart";
import { gql, useMutation } from "@apollo/client";
import styles from "../../styles/pages/Student.module.css";


//  INSERT CURRENT ORDERS QUERY
const INSERT_ORDER = gql`
	mutation insertOrder($current_orders: [current_orders_insert_input!]!) {
		insert_current_orders(objects: $current_orders) {
			returning {
				student_id
				order
				amount
				order_num
				order_time
				canteen_email
			}
		}
	}
`;
const Cart = (menuList) => {
	// console.log(menuList.menuList[0].email)
	const generateNum = () => {
		const order_num = Math.floor(Math.random() * 90000) + 10000;
		return order_num;
	};

	const {
		isEmpty,
		totalUniqueItems,
		items,
		// eslint-disable-next-line
		totalItems,
		cartTotal,
		updateItemQuantity,
		removeItem,
		emptyCart,
	} = useCart();
	const date = new Date();
	var timestamp_with_time_zone = date.toISOString();
	var timestamp = timestamp_with_time_zone.slice(0, 19);

	const [insertOrder] = useMutation(INSERT_ORDER);
	const { user } = useOutletContext();

	if (isEmpty) return <h1 className={styles.title}>Your Cart is Empty</h1>;
	const handleInsertOrder = async (items) => {
		// console.log(items);
		// Calculate the price of the order
		const orderPrice = items.reduce((acc, item) => {
			return acc + item.price * item.quantity;
		}, 0);
		// console.log(orderPrice);
		try {
			await insertOrder({
				variables: {
					current_orders: {
						student_id: user?.id,
						order: items,
						amount: orderPrice,
						order_num: generateNum(),
						order_time: timestamp,
						canteen_email: items[0].email,
					},
				},
			});
		} catch (err) {
			console.log(err);
		}
	};

	const handleSubmitOrder = async () => {
		// console.log(items)
		// Create a new array to take only the items which are from a particular canteen and keep removing that particular order from the items array while the items array is not empty.
		// Then send the order to the database and repeat the process until the items array is empty.
		while (items.length > 0) {
			let canteenItems = [];
			let canteenEmail = items[0].email;
			for (let i = 0; i < items.length; i++) {
				if (items[i].email === canteenEmail) {
					canteenItems.push(items[i]);
					items.splice(i, 1);
					i--;
				}
			}
			// console.log(canteenItems);
			await handleInsertOrder(canteenItems);
		}


	};

	return (
		<div className="cart">

			<h1>Your Ordered items <i className="fa-sharp fa-solid fa-cart-shopping"></i><span className="badge badge-warning">{totalUniqueItems}</span></h1>

			<div>
				<div className="card">
					<div className="card-body cart-body">
						<table className="table">
							<thead>
								<tr className="row ">
									<th className="col">Item Name</th>
									<th className="col">Price</th>
									<th className="col">Quantity</th>
									<th className="col">Actions</th>
								</tr>
							</thead>
							<tbody>
								{items.map((item, index) => {
									return (
										<tr className="row" key={index} >
											<td className="col">{item.name}</td>
											<td className="col">{item.price}</td>
											<td className="col">{item.quantity}</td>
											<td className="col action-col">
												<button
													className="btn item-btn-cart minus"
													onClick={() =>
														updateItemQuantity(item.id, item.quantity - 1)
													}
												>
													<i className="fa fa-minus sign"></i>
												</button>

												<button
													className="btn item-btn-cart"
													onClick={() => {
														const itemDetail = menuList.menuList?.find(itemDetails => {
															return itemDetails.id === item.id;
														});
														console.log(itemDetail);
														updateItemQuantity(
															item.id,
															item.quantity < (itemDetail?.quantity || 0)
																? item.quantity + 1
																: item.quantity
														);
													}}
												>
													<i className="fa fa-plus sign"></i>
												</button>

												<button
													className="btn trash-btn"
													onClick={() => {
														removeItem(item.id);
													}}
												>
													<i className="fa-solid fa-trash"></i>
												</button>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
				<div className="total-order">
					<div className="col-auto mt-3 ms-auto">
						<h4 className={styles.totalprice}>Total Price - Rs.{cartTotal}</h4>
					</div>
					<div className="col-auto order-buttons">
						<button
							className="btn m-2"
							onClick={() => {
								emptyCart();
							}}
							style={{backgroundColor:"#a65111",color:"white"}}
						>
							Empty Cart
						</button>
						<button
							className="btn m-2"
							onClick={() => {
								handleSubmitOrder();
								emptyCart();
							}}
							style={{backgroundColor:"#173f4e",color:"white"}}
						>
							Place Order
						</button>
					</div>
				</div>
			</div>

		</div>
	);
};

export default Cart;
