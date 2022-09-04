import React from "react";
import { useCart } from "react-use-cart";

const StudentMenu = ({ itemDetails }) => {
	const { addItem, getItem } = useCart();

	return (
		<tr className="row">
			<td className="col">{itemDetails.name}</td>
			<td className="col">{itemDetails.price}</td>
			<td className="col">{itemDetails.quantity}</td>
			<td className="col">
				<button
					className="btn"
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
					Add To Cart
				</button>
			</td>
		</tr>
	);
};

export default StudentMenu;
