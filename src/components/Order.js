
//svg imports
import cardpay from '../assets/cardpay.svg';
import cashpay from '../assets/cashpay.svg';
import upipay from '../assets/upipay.svg';
import delivered from '../assets/delivered.svg';
import preparing from '../assets/preparing.svg';
import ofd from '../assets/outfordelivery.svg';

//stylesheet import
import '../styles/components/Order.css';

const Order = ({order}) => {



    //conditional logic for status display
    const paymentTypeURL = order.paymentType === 'cash' ? cashpay : (order.paymentType === 'upi' ? upipay : cardpay);
    const orderStatusURL = order.orderStatus === 'preparing' ? preparing : (order.orderStatus === 'out-for-delivery' ? ofd : delivered);



  return (
        <div className='order-container' >
            <div className='order-items' >
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">S.no</th>
                            <th scope="col">Item</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Price</th>
                        </tr>
                    </thead>
                    <tbody>

                        {order.items.map((item,index)=> <tr
                            key={item.id}
                        >
                            <th scope="row">{index+1}</th>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                        </tr>)}

                        <tr>
                            <th scope='row' colSpan='3'>Total</th>
                            <td>
                                {order.items.reduce((accumulator, item)=> accumulator+item.price, 0)}
                            </td>
                        </tr>
                        <tr>
                            <th scope='row' colSpan='4'></th>
                        </tr>
                        <tr>
                            <th scope='row' colSpan='2'>Payment Type:</th>
                            <td>{order.paymentType}</td>
                        </tr>
                        <tr>
                            <th scope='row' colSpan='2'>Order Status</th>
                            <td>{order.orderStatus}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='img-container' >
                <div className='order-status' >
                        <img src={orderStatusURL} className="payment-img-top" alt="..." />
                </div>
                <div className='payment-type' >
                        <img src={paymentTypeURL} className="payment-img-top" alt="..." />
                </div>
            </div>
        </div>
  )
}

export default Order