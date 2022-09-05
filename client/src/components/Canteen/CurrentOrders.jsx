import React from "react";
import { gql, useQuery } from "@apollo/client";

// Get Current Orders Query

const GET_ORDER = gql`
query MyQuery {
    current_orders {
      amount
      order
      order_num
      order_time
      student_id
    }
  }
`

function CurrentOrder() {
    const { error, data } = useQuery(GET_ORDER);
    const orders = data?.current_orders

    return (
        <div>
            <h1>Current Orders</h1>
            {!data ? (
                "No Orders Yet"
            ) : (
                <table className="table">
                    <thead>
                        <tr className="row">
                            <th className="col">Student Id</th>
                            <th className="col">Order Number</th>
                            <th className="col"> Order
                                <tr className="row"> 
                                    <th className="col">Name</th>
                                    <th className="col">Quantity</th>
                                </tr>
                            </th>
                            <th className="col">Total Amount</th>
                            <th className="col">Order Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!error
                            ? orders?.map((orderDetails) => {
                                return (
                                    <tr className="row">
                                        <td className="col">{orderDetails.student_id}</td>
                                        <td className="col">{orderDetails.order_num}</td>
                                        <td className="col">{orderDetails.order.map((element)=>{
                                            return(
                                                <tr className="row">
                                                    <td className="col">{element.name}</td>
                                                    <td className="col">{element.quantity}</td>
                                                </tr>
                                            )
                                        })}</td>
                                        <td className="col">{orderDetails.amount}</td>
                                        <td className="col">{orderDetails.order_time}</td>
                                    </tr>
                                );
                            })
                            : "Something went wrong, Check back after sometime "}
                    </tbody>
                </table>
            )}

        </div>
    )
}

export default CurrentOrder;