import React from "react";
import "../../styles/Canteen/modifymenu.css"

const EditRow = ({ editMenuData, handleEditMenuChange, handleCancelClick }) => {
	return (
		<tr className="row">
			<td className="col">
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
			<td className="col">
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
			<td className="col">
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
			<td className="col">
				<button className="btn" type="submit">
				<i class="fa-solid fa-check"></i>
				</button>

				<button type="button" className="btn" onClick={handleCancelClick}>
				<i class="fa-solid fa-xmark"></i>
				</button>
			</td>
		</tr>
	);
};

export default EditRow;
