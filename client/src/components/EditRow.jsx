import React from "react";

const EditRow = ({handleNewName, handleNewPrice, handleNewQuantity, newName, newPrice, newQuantity})=>{
    return(
        <div>
            <tr>
                <td>
                    <input type="text" placeholder="Update Name" value={newName} onChange={handleNewName}></input>
                </td>
                <td>
                    <input type="text" placeholder="Update Price" value={newPrice} onChange={handleNewPrice}></input>
                </td>
                <td>
                    <input type="text" placeholder="Update Quantity" value={newQuantity} onChange={handleNewQuantity}></input>
                </td>
                <td>
                    <button type="submit">Update</button>
                    <button type="button">Delete</button>
                </td>
            </tr>
        </div>
    )
}


export default EditRow;