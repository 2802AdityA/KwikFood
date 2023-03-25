//svg imports
import preparing from '../assets/preparing.svg';
import placed from "../assets/placed.svg";
import ready from "../assets/ready.svg"
//stylesheet import
import '../styles/components/Order.css';
import { useQuery, gql } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';


// Get amount from current orders query
const GET_CURRENT_ORDERS = gql`
query currentOrders($order_num: numeric!) {
  current_orders(where: {order_num: {_eq: $order_num}}) {
    amount
  }
}
`;

const Order = ({ order: orders }) => {

    const orderNum = orders.order_num;

    // get current orders amount
    const { data } = useQuery(GET_CURRENT_ORDERS, {
        variables: { order_num: orderNum },
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
                contact: '9999999999'
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


    //conditional logic for status display
    const orderStatusURL = orders.order_status === 'Preparing' ? preparing : (orders.order_status === 'Ready' ? ready : placed);

    return (
        <div className='order-container' >
            <div className='order-items' >
                <table className="table">
                    <thead>
                        <tr>

                            <th scope="col">Item</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Rate</th>
                            <th scope="col">Price</th>
                        </tr>
                    </thead>
                    <tbody>

                        {orders.order.map((item, index) => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.price}</td>
                                    <td>{item.price * item.quantity}</td>
                                </tr>
                            )
                        })}

                        <tr>
                            <th scope='row' colSpan='3'>Total</th>
                            <td>
                                {orders.amount}
                                {/* {order.amount.reduce((accumulator, item) => accumulator + item.price, 0)} */}
                            </td>
                        </tr>
                        <tr>
                            <th scope='row' colSpan='4'></th>
                        </tr>
                        <tr>
                            <th scope='row' colSpan='2'>Order Status</th>
                            <td>{orders.order_status}</td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={handleSubmit}>PAY</button>
            </div>
            <div className='img-container' >
                <div className='order-status' >
                    <img src={orderStatusURL} className="payment-img-top" alt="..." />
                </div>
            </div>
        </div>
    )
}

export default Order