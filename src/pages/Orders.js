import Order from "../components/Order";
import orders from "../devdata/dummyorders";

import '../styles/pages/Orders.css';

const Orders = () => {

    

  return (
    <div className='orders-container'>
        {orders.map(order=> <Order key={order.id} order={order} />)}
    </div>
  )
}

export default Orders;