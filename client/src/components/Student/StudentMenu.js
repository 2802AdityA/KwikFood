import React from "react";
import { useCart } from "react-use-cart";
import "../../styles/Student/StudentHome.css";
const StudentMenu = ({ itemDetails }) => {
	const { addItem, getItem } = useCart();

	return (
		<tr className="row">
			<td className="col">{itemDetails.name}</td>
			<td className="col">{itemDetails.price}</td>
			<td className="col">{itemDetails.quantity}</td>
			<td className="col">
				<button
					className="btn item-btn"
					type="button"
					onClick={() => {
						const item = getItem(itemDetails.id);

						item
							? item.quantity < itemDetails.quantity
								? addItem(itemDetails)
								: console.log("Exceeded")
							: addItem(itemDetails);
					}}
				>
					<i className="fa fa-plus plus"></i>
				</button>
			</td>
		</tr>
	);
};

export default StudentMenu;
