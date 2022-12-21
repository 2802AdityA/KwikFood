import React from "react";
import "../../styles/Canteen/modifymenu.css"

const ReadRow = ({ itemDetails, handleEditClick, handleDeleteClick }) => {
	return (
		<tr className="row">
			<td className="col">{itemDetails.name}</td>
			<td className="col">{itemDetails.price}</td>
			<td className="col">{itemDetails.quantity}</td>
			<td className="col">
				<button
					className="btn"
					type="button"
					onClick={(e) => handleEditClick(e, itemDetails)}
				>
					<i className="fa-solid fa-pen"></i>
				</button>
				<button
					className="btn"
					type="button"
					onClick={() => handleDeleteClick(itemDetails.id)}
				>
					<i className="fa-solid fa-trash-can"></i>
				</button>
			</td>
		</tr>
	);
};

export default ReadRow;
