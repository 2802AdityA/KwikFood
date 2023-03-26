import Order from "../components/Order";
// import orders from "../devdata/dummyorders";
import { gql, useQuery } from '@apollo/client';
import '../styles/pages/Orders.css';
import { useOutletContext } from 'react-router-dom';
// gql query to get orders from current_order database
const GET_ORDERS = gql`
  query orders($id: uuid) {
    current_orders(where: { student_id: { _eq: $id } }) {
      amount
    canteen_email
     order
    order_num
    order_status
    student_id
    }
  }
`;
const Orders = () => {
  const { user } = useOutletContext();
  const id = user.id;
  // Get order from current_order databse
  const { loading, error, data } = useQuery(GET_ORDERS, {
    variables: { id: id },
  });
  if (loading) return "Loading..";
  if (error) return `Error! ${error.message}`;
  console.log(data.current_orders);
  const orders = data.current_orders;

  return (
    <div className='orders-container'>
      <h1 style={{marginBottom:"8px"}}> YOUR ORDERS</h1>
      {orders.map(order => <Order key={order.order_num} order={order} />)}
    </div>
  )
}

export default Orders;
