//svg imports
import preparing from '../assets/preparing.svg';
import placed from "../assets/placed.svg";
import ready from "../assets/ready.svg"
//stylesheet import
import '../styles/components/Order.css';
import { useQuery, gql, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';


// Get amount from current orders query
const GET_CURRENT_ORDERS = gql`
query currentOrders($order_num: numeric!) {
  current_orders(where: {order_num: {_eq: $order_num}}) {
    amount
    canteen_email
  }
}
`;

// Get canteen name from canteen email query
const GET_CANTEEN_NAME = gql`query canteenName($canteen_email: citext!) {
    canteen_email(where: {owner_email: {_eq: $canteen_email}}) {
        canteen_name
    }
}`


// Update payment status query from current orders table
const UPDATE_PAYMENT_STATUS = gql`
mutation updatePaymentStatus($order_num: numeric!, $payment_status: Boolean!) {
    update_current_orders(where: {order_num: {_eq: $order_num}}, _set: {payment_status: $payment_status}) {
        affected_rows
        returning {
            payment_status
        }
    }
}`;


const Order = ({ order: orders }) => {

    const orderNum = orders.order_num;

    // get current orders amount
    const { data } = useQuery(GET_CURRENT_ORDERS, {
        variables: { order_num: orderNum },
    });

    const amountValue = data?.current_orders[0]?.amount;


    // get canteen email
    const canteenEmail = data?.current_orders[0]?.canteen_email;
    // get canteen name
    const { data: canteenName } = useQuery(GET_CANTEEN_NAME, {
        variables: { canteen_email: canteenEmail },
    });
    const canteenNameValue = canteenName?.canteen_email[0]?.canteen_name


    // check payment status
    const [updatePaymentStatus] = useMutation(UPDATE_PAYMENT_STATUS);
    const [paymentStatus, setPaymentStatus] = useState(false);
    useEffect(() => {
        if (paymentStatus) {
            updatePaymentStatus({
                variables: {
                    order_num: orderNum,
                    payment_status: paymentStatus,
                },
            });
        }
    }, [paymentStatus, updatePaymentStatus, orderNum]);


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
            image: 'https://example.com/your_logo',
            handler: function (response) {
                setPaymentStatus(true);
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
    let statusColor = '';
    if (orders.order_status === 'Preparing') {
        statusColor = 'warning';
    } else if (orders.order_status === 'Ready') {
        statusColor = 'success';
    } else {
        statusColor = 'danger';
    }

    return (
        <div className='order-container' >
            <div className='order-items' >
                <div className='details'>
                    <h3>{canteenNameValue}</h3>
                    <h6>Order Number - {orderNum}</h6>
                </div>
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
                            <th scope='row' colSpan='2' >Total</th>
                            <td>
                                {orders.amount}
                                {/* {order.amount.reduce((accumulator, item) => accumulator + item.price, 0)} */}
                            </td>
                        </tr>
                        <tr>
                            <th scope='row' colSpan='4' style={{ border: "none" }}></th>
                        </tr>
                        <tr>
                            <th scope='row' colSpan='2' style={{ border: "none" }}>Order Status</th>
                            <td style={{ border: "none" }}>
                                <span className={`badge rounded-pill text-bg-${statusColor} badge-font-size-20`} >{orders.order_status}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                {orders.order.map((item, index) => {
                    // if payment is done then show the button
                    if (!item.payment_status) {
                        return (
                            <div className='btn-container' key={item.id}>
                                <button className='btn btn-success' onClick={handleSubmit} >Pay</button>
                            </div>
                        )
                    }
                    else{
                        return (
                            <div className='btn-container' key={item.id}>
                                <button className='btn btn-success' disabled >Paid</button>
                            </div>
                        )
                    }
                })}
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