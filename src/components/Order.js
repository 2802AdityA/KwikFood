
//svg imports
import preparing from '../assets/preparing.svg';
import placed from "../assets/placed.svg";
import ready from "../assets/ready.svg"
//stylesheet import
import '../styles/components/Order.css';

const Order = ({ order: orders }) => {


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