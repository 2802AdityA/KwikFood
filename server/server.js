const express = require('express');
const path = require('path');
const app = express();
const Razorpay = require('razorpay');
const shortid = require('shortid');
const cors = require('cors');
const port = 5000;

app.use(cors());

const razorpay = new Razorpay({
    key_id: 'rzp_test_oEOyciCXCmfDBS',
    key_secret: 'j9iW5PbgeqhhWNmzHoLXl8n2',
});

// app.post('/razorpay', async (req, res) => {
//     const payment_capture = 1;
//     const amount = 1;
//     const currency = 'INR';
//     const options = {
//         amount : amount * 100,
//         currency,
//         receipt: shortid.generate(),
//         payment_capture
//     }
//     try {
//         const response = await razorpay.orders.create(options);
//         console.log(response);
//         res.json ({
//             id: response.id,
//             currency: response.currency,
//             amount: response.amount
//         })
//     }catch (error) {
//         console.log(error);
//     }
// })

app.post('/razorpay', async (req, res) => {
    // const payment_capture = 1;
    // const amount = req.body.amount;
    // const currency = 'INR';
    // const options = {
    //     amount: amount * 100,
    //     currency,
    //     receipt: shortid.generate(),
    //     payment_capture
    // }

    // try {
    //     const response = await razorpay.orders.create(options);
    //     console.log(response);
    //     res.json({
    //         id: response.id,
    //         currency: response.currency,
    //         amount: response.amount
    //     })
    // } catch (error) {
    //     console.log(error);
    // }

    
    console.log(res.body);
    console.log(req.body);
})


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});