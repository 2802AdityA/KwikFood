import React from "react";

const ReadRow = ({ itemDetails, handleEditClick, handleDeleteClick }) => {
	return (
		<tr>
			<td>{itemDetails.name}</td>
			<td>{itemDetails.price}</td>
			<td>{itemDetails.quantity}</td>
			<td>
				<button type="button" onClick={(e) => handleEditClick(e, itemDetails)}>
					Edit
				</button>
				<button type="button" onClick={() => handleDeleteClick(itemDetails.id)}>
					Delete
				</button>
			</td>
		</tr>
	);
};

export default ReadRow;
