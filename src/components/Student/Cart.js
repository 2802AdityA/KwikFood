import React from "react";
import { useOutletContext } from "react-router-dom";
import { useCart } from "react-use-cart";
import { gql, useMutation } from "@apollo/client";
import styles from "../../styles/pages/Student.module.css";
// # GET CURRENT ORDERS QUERY

// query MyQuery {
//   current_orders {
//     amount
//     order
//     order_num
//     order_time
//     student_id
//   }
// }

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
				// canteen_email
			}
		}
	}
`;
const Cart = (menuList) => {
	const order_num = Math.floor(Math.random() * 90000) + 10000;

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

	const handleSubmitOrder = async () => {
		console.log(items)
		try {
			await insertOrder({
				variables: {
					current_orders: {
						student_id: user?.id,
						order: items,
						amount: cartTotal,
						order_num: order_num,
						order_time: timestamp,
						// canteen_email: 
					},
				},
			});
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="cart">
			{/* <div>
				<h2 className={styles.title}>Order Your Meal</h2>
				<p className={styles["welcome-text"]}>
					Welcome, {user?.metadata?.firstName || "stranger"}{" "}
					<span role="img" alt="hello">
						👋
					</span>
				</p>
			</div> */}
			<h1 className={styles.title}>Your Ordered items <i class="fa-sharp fa-solid fa-cart-shopping"></i><span className="badge badge-warning">{totalUniqueItems}</span></h1>
			<div>
				{/* {!data ? (
					"no data"
				) : ( */}

				<div className="card">
					<div className="card-body cart-body">
						<table className="table">
							<thead>
								<tr className="row table-primary">
									<th className="col">Item Name</th>
									<th className="col">Price</th>
									<th className="col">Quantity</th>
									<th className="col">Actions</th>
								</tr>
							</thead>
							<tbody>
								{items.map((item, index) => {
									return (
										<tr className="row" key={index}>
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
														const itemDetail = menuList.menuList?.find(
															(itemDetails) => {
																return itemDetails.id === item.id;
															}
														);

														updateItemQuantity(
															item.id,
															item.quantity < itemDetail.quantity
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
				<div className="col-auto mt-3 ms-auto">
					<h4 className={styles.totalprice}>Total Price - Rs.{cartTotal}</h4>
				</div>
				<div className="col-auto order-buttons">
					<button
						className="btn btn-danger m-2"
						onClick={() => {
							emptyCart();
						}}
					>
						Empty Cart
					</button>
					<button
						className="btn btn-success m-2"
						onClick={() => {
							handleSubmitOrder();
							emptyCart();
						}}
					>
						Place Order
					</button>
				</div>
			</div>

		</div>
	);
};

export default Cart;
