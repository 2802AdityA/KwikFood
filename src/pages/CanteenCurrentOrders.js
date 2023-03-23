import React from "react";
import "../styles/Canteen/Canteencurrentorders.css";
import { useQuery, gql, useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

// GET CURRENT ORDERS QUERY
const GET_CURRENT_ORDERS = gql`
  query currentOrders($email: citext) {
    current_orders(where: { canteen_email: { _eq: $email } }) {
      amount
      order
      order_num
      order_time
      student_id
      order_status
    }
  }
`;

// query to update the order status
const UPDATE_ORDER_STATUS = gql`
mutation updateOrderStatus($order_num: numeric!, $order_status: String!) {
    update_current_orders_by_pk(pk_columns: { order_num: $order_num }, _set: { order_status: $order_status }) {
        order_num
        order_status
    }
}
`;

// query to delete the order from the current orders table
const DELETE_ORDER = gql`
mutation deleteOrder($order_num: numeric!) {
    delete_current_orders_by_pk(order_num: $order_num) {
        order_num
    }
}
`;

export default function Canteencurrentorders() {

    // if order is received, delete the order from the current orders table
    const [deleteOrderMutation] = useMutation(DELETE_ORDER);
    const deleteOrder = (order_num) => {
        deleteOrderMutation({
            variables: {
                order_num: order_num,
            },
        });
    };

    // update order status mutation to update the order status
    const [updateOrderStatus] = useMutation(UPDATE_ORDER_STATUS);

    // update the order status on click of the button in the modal
    const updateStatus = (order_num, order_status) => {
        updateOrderStatus({
            variables: {
                order_num: order_num,
                order_status: order_status,
            },
        });
        if (order_status === "Received") {
            deleteOrder(order_num);
        }
        // Reload the page after updating the order status
        reloadPage();
    };
    // Create a async function to reload the page
    const reloadPage = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        window.location.reload();
    };


    const { user } = useOutletContext();
    const [email, setEmail] = useState("");
    // this useEffect is used to set the email of the user to the email state
    useEffect(() => {
        setEmail(user.email); // eslint-disable-next-line
    }, []);

    const { data, loading, error } = useQuery(GET_CURRENT_ORDERS, {
        variables: { email: email },
    });

    if (loading) return "Loading..";
    if (error) return `Error! ${error.message}`;

    const orderList = data?.current_orders;

    return (
        <div>
            {!data ? (
                "no data"
            ) : (
                <div className="card">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table align-middle table-nowrap table-check">
                                <thead className="table-secondary">
                                    <tr className="table-primary">
                                        <th className="align-middle">Order-ID</th>
                                        <th className="align-middle">Item Name</th>
                                        <th className="align-middle">Total Amount</th>
                                        <th className="align-middle">View Details</th>
                                        <th className="align-middle">Order Status</th>
                                        <th className="align-middle">Current Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!error ? (
                                        orderList.map((order) => {
                                            return (
                                                <tr key={order.order_num}>
                                                    <td className="text-body fw-bold">{order.order_num}</td>
                                                    <td>
                                                        {order.order.map((item) => (
                                                            <div key={item.id}>{item.name}</div>
                                                        ))}
                                                    </td>
                                                    <td>{order.amount}</td>
                                                    <td>
                                                        <button
                                                            key={order.order_num}
                                                            type="button"
                                                            className="btn btn-sm btn-rounded table-btn"
                                                            data-bs-toggle="modal"
                                                            data-bs-target={`#orderdetails-${order.order_num}`}
                                                        >
                                                            View Details
                                                        </button>
                                                        <div
                                                            className="modal fade"
                                                            id={`orderdetails-${order.order_num}`}
                                                            data-bs-backdrop="static"
                                                            data-bs-keyboard="false"
                                                            tabIndex="-1"
                                                            aria-labelledby="staticBackdropLabel"
                                                            aria-hidden="true"
                                                        >
                                                            <div className="modal-dialog modal-dialog-centered">
                                                                <div className="modal-content">
                                                                    <div className="modal-header">
                                                                        <h5
                                                                            className="modal-title"
                                                                            id="staticBackdropLabel"
                                                                        >
                                                                            Order Details
                                                                        </h5>
                                                                        <button
                                                                            type="button"
                                                                            className="btn-close"
                                                                            data-bs-dismiss="modal"
                                                                            aria-label="Close"
                                                                        ></button>
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
                                                                                {order.order.map((item) => (
                                                                                    <tr>
                                                                                        <td>
                                                                                            <div>
                                                                                                <p className="text-dark">
                                                                                                    {item.name}
                                                                                                </p>

                                                                                                <p className="text-muted mb-0">
                                                                                                    {item.quantity} X Rs. {item.price}{" "}
                                                                                                </p>

                                                                                            </div>
                                                                                        </td>
                                                                                        <td>Rs. {item.itemTotal}</td>
                                                                                    </tr>
                                                                                ))}
                                                                                <tr>
                                                                                    <td>
                                                                                        <h6 className="m-0 text-right text-dark ">
                                                                                            Total:
                                                                                        </h6>
                                                                                    </td>
                                                                                    <td>Rs. {order.amount}</td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                    <div className="modal-footer">
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-secondary"
                                                                            data-bs-dismiss="modal"
                                                                        >
                                                                            Close
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-rounded table-btn"
                                                            data-bs-toggle="modal"
                                                            data-bs-target={`#orderstatus-${order.order_num}`}
                                                        >
                                                            Update status
                                                        </button>
                                                        <div
                                                            className="modal fade"
                                                            id={`orderstatus-${order.order_num}`}
                                                            data-bs-backdrop="static"
                                                            data-bs-keyboard="false"
                                                            tabIndex="-1"
                                                            aria-labelledby="staticBackdropLabel"
                                                            aria-hidden="true"
                                                        >
                                                            <div className="modal-dialog modal-dialog-centered">
                                                                <div className="modal-content">
                                                                    <div className="modal-header">
                                                                        <h5
                                                                            className="modal-title"
                                                                            id="staticBackdropLabel"
                                                                        >
                                                                            Update Order Status
                                                                        </h5>
                                                                        <button
                                                                            type="button"
                                                                            className="btn-close"
                                                                            data-bs-dismiss="modal"
                                                                            aria-label="Close"
                                                                        ></button>
                                                                    </div>
                                                                    <div className="modal-body status">
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-sm btn-outline-warning font-size-12"
                                                                            data-bs-dismiss="modal"
                                                                            onClick={() => updateStatus(order.order_num, "Preparing")}
                                                                        >
                                                                            Preparing
                                                                        </button>
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-sm btn-outline-success font-size-12"
                                                                            data-bs-dismiss="modal"
                                                                            onClick={() => updateStatus(order.order_num, "Ready")}
                                                                        >
                                                                            Ready
                                                                        </button>
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-sm btn-outline-info font-size-12"
                                                                            data-bs-dismiss="modal"
                                                                            onClick={() => updateStatus(order.order_num, "Received")}
                                                                        >
                                                                            Recieved
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>{order.order_status}</td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td>No Orders</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
};