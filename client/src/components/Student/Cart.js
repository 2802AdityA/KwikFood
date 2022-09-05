import React from "react";
import { useOutletContext } from "react-router-dom";
import { useCart } from "react-use-cart";
import { gql, useMutation } from "@apollo/client";

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

	if (isEmpty) return <h1 className="text-center">Your Cart is Empty</h1>;

	const handleSubmitOrder = async () => {
		try {
			await insertOrder({
				variables: {
					current_orders: {
						student_id: user?.id,
						order: items,
						amount: cartTotal,
						order_num: order_num,
						order_time: timestamp,
					},
				},
			});
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<section className="py-4 container">
			<div className="row justify-content-center">
				<div className="col-12">
					<h5>
						Cart({totalUniqueItems}) total Items: ({totalItems})
					</h5>
					<table className="table table-light table-hover m-0">
						<tbody>
							{items.map((item, index) => {
								return (
									<tr key={index}>
										<td>{item.name}</td>
										<td>{item.price}</td>
										<td> Quantity - ({item.quantity})</td>
										<td>
											<button
												className="btn btn-info ms-2"
												onClick={() =>
													updateItemQuantity(item.id, item.quantity - 1)
												}
											>
												-
											</button>
											<button
												className="btn btn-info ms-2"
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
												+
											</button>
											<button
												className="btn btn-danger ms-2"
												onClick={() => {
													removeItem(item.id);
												}}
											>
												Remove Item
											</button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
				<div className="col-auto mt-3 ms-auto">
					<h2>Total Price - ${cartTotal}</h2>
				</div>
				<div className="col-auto">
					<button
						className="btn btn-danger m-2"
						onClick={() => {
							emptyCart();
						}}
					>
						Empty Cart
					</button>
					<button
						className="btn btn-primary m-2"
						onClick={() => {
							handleSubmitOrder();
							emptyCart();
						}}
					>
						Place Order
					</button>
				</div>
			</div>
		</section>
	);
};

export default Cart;
