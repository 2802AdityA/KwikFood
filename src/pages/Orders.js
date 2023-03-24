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

// function to load razorpay script
function loadScript(src) {
  return new Promise(resolve => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  })
}

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

  async function displayRazorpay() {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    // send amount to server side 
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: amountValue })
    };

    const data = await fetch(`http://localhost:5000/razorpay/`, requestOptions).then((t) => t.json());


    // const options = {
    //   "key": "rzp_test_oEOyciCXCmfDBS",
    //   currency: data.currency,
    //   amount: amountValue,
    //   order_id: data.id,
    //   "name": "KWIK FOOD",
    //   "description": "Transaction for Kwik Food",
    //   // "image": "https://example.com/your_logo",
    //   "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
    //   "prefill": {
    //     "name": `${fname} ${lname}`,
    //     "email": email,
    //     "contact": "9000090000"
    //   },
    //   "notes": {
    //     "address": "Razorpay Corporate Office"
    //   },
    //   "theme": {
    //     "color": "#3399cc"
    //   }
    // };
    // const paymentObject = new window.Razorpay(options);
    // paymentObject.open();


      const options = {
        "key": "rzp_test_oEOyciCXCmfDBS",
        currency: data.currency,
        amount: amountValue,
        order_id: data.id,
        "name": "KWIK FOOD",
        "description": "Transaction for Kwik Food",
        // "image": "https://example.com/your_logo",
        "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
        "prefill": {
          "name": `${fname} ${lname}`,
          "email": email,
          "contact": "9000090000"
        },
        "notes": {
          "address": "Razorpay Corporate Office"
        },
        "theme": {
          "color": "#3399cc"
        }
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
  }


  return (
    <div className='orders-container'>
      {orders.map(order => <Order key={order.id} order={order} />)}
      <button type="button" onClick={displayRazorpay}>Pay With Razorpay</button>
    </div>
  )
}

export default Orders;