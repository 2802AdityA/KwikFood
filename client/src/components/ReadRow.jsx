import React from "react";


const ReadRow = ({itemDetails, handleEditClick}) => {

    return (
        <div>
            <tr>
                <th>{itemDetails.name}</th>
                <th>{itemDetails.price}</th>
                <th>{itemDetails.quantity}</th>
                <th>
                    <button type="button" onClick={(e)=> handleEditClick(e,itemDetails)}>Edit</button>
                </th>
            </tr>
        </div>
    )
}

export default ReadRow;