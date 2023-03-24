import Order from "../components/Order";
import orders from "../devdata/dummyorders";
import '../styles/pages/Orders.css';
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";

// Get amount from current orders query
const GET_CURRENT_ORDERS = gql`
query currentOrders($order_num: numeric!) {
  current_orders(where: {order_num: {_eq: $order_num}}) {
    amount
  }
}
`;


const Orders = () => {

  // get current orders amount
  const { data } = useQuery(GET_CURRENT_ORDERS, {
    variables: { order_num: 28179 },
  });

  const amountValue = data?.current_orders[0]?.amount;

  // razorpay payment gateway
  const { user } = useOutletContext();
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    setFName(user?.metadata?.firstName);
    setLName(user?.metadata?.lastName);
    setEmail(user.email); // eslint-disable-next-line
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    const options = {
      key: 'rzp_test_oEOyciCXCmfDBS',
      key_secret: 'j9iW5PbgeqhhWNmzHoLXl8n2',
      amount: amountValue * 100,
      currency: 'INR',
      name: 'KWIK FOOD',
      description: 'Transaction for Kwik Food',
      // image: 'https://example.com/your_logo',
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature)
      },
      prefill: {
        name: `${fname} ${lname}`,
        email: email,
        contact: '9000090000'
      },
      notes: {
        address: 'Razorpay Corporate Office'
      },
      theme: {
        color: '#3399cc'
      }
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  }

    return (
      <div className='orders-container'>
        {orders.map(order => <Order key={order.id} order={order} />)}
        <button type="button" onClick={handleSubmit}>Pay With Razorpay</button>
      </div>
    )
  }

  export default Orders;