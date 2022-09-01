import React from "react";

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
					Edit
				</button>
				<button
					className="btn"
					type="button"
					onClick={() => handleDeleteClick(itemDetails.id)}
				>
					Delete
				</button>
			</td>
		</tr>
	);
};

export default ReadRow;
