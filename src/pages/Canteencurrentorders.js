import React from 'react';
import "../styles/Canteen/Canteencurrentorders.css";

const data = [
    {
        OrderId: 1,
        Name: "Shreshth",
        OrderTime: "08:13:14",
        Amount: "800",
    },
    {
        OrderId: 2,
        Name: "Vanshika",
        OrderTime: "08:13:15",
        Amount: "80",
    }
]

const orderdetails = [
    {
        quantity: 3,
        item: "maggi",
        price: 30,
        total: 90,
    },
    {
        quantity: 2,
        item: "aloo patty",
        price: 15,
        total: 30,
    }
]


export default function Canteencurrentorders() {
    return (
        <div className="table-responsive">
            <table className="table align-middle table-nowrap table-check">
                <thead className="table-secondary">
                    <tr>
                        <th className="align-middle">Order-ID</th>
                        <th className="align-middle">Billing Name</th>
                        <th className="align-middle">Total Amount</th>
                        <th className="align-middle">View Details</th>
                        <th className="align-middle">Order Status</th>
                        <th className="align-middle">Current Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((order) => (
                        <tr>
                            <td className="text-body fw-bold">{order.OrderId} </td>
                            <td>{order.Name}</td>
                            <td>{order.Amount}</td>
                            <td>
                                <button type="button" className="btn btn-sm btn-rounded table-btn" data-bs-toggle="modal" data-bs-target="#orderdetails">
                                    View Details
                                </button>
                                <div className="modal fade" id="orderdetails" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="staticBackdropLabel">Order Details</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <table className="table align-middle table-nowrap">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Item</th>
                                                            <th scope="col">Price</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {orderdetails.map((details) => (
                                                            <tr>
                                                                <td>
                                                                    <div>
                                                                        <p className=" text-dark">{details.item}</p>
                                                                        <p className="text-muted mb-0">Rs.{details.price} X {details.quantity}</p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    {details.total}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                        <tr>
                                                            <td>
                                                                <h6 className="m-0 text-right text-dark ">Total:</h6>
                                                            </td>
                                                            <td>
                                                                Rs. 120
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <button type="button" className="btn btn-sm btn-rounded table-btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                    Update status
                                </button>
                                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="staticBackdropLabel">Update Order Status</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body status">
                                                <button type="button" className="btn btn-sm btn-outline-success font-size-12">Ready</button>
                                                <button type="button" className="btn btn-sm btn-outline-warning font-size-12">Preparing</button>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Update</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    )
}
