import React from "react";

const EditRow = ({ editMenuData, handleEditMenuChange, handleCancelClick }) => {
	return (
		<tr>
			<td>
				<input
					className="form-control"
					type="text"
					rerquired="required"
					placeholder="Update Name"
					name="name"
					value={editMenuData.name}
					onChange={handleEditMenuChange}
				/>
			</td>
			<td>
				<input
					className="form-control"
					type="text"
					required="required"
					name="price"
					placeholder="Update Price"
					value={editMenuData.price}
					onChange={handleEditMenuChange}
				/>
			</td>
			<td>
				<input
					className="form-control"
					type="text"
					rerquired="erquired"
					name="quantity"
					placeholder="Update Quantity"
					value={editMenuData.quantity}
					onChange={handleEditMenuChange}
				/>
			</td>
			<td>
				<button type="submit">Save</button>
				<button type="button" onClick={handleCancelClick}>
					Cancel
				</button>
			</td>
		</tr>
	);
};

export default EditRow;
