const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


// User Authentication

// check user credentials and handle login (any user)
app.post('/login', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
})

// create a new user account (customer)
app.post('/register', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
})


// Medicines

// add new medicine (pharmacist)
app.post('/medicine/add', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
})

// remove medicine (pharmacist)
app.post('/medicine/remove', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
})

// update medicine description (pharmacist)
app.post('/medicine/update/description', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
})

// update quantity (manager)
app.post('/medicine/update/quantity', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
})

// search medicine (if no search string is provided get all medicines) (customer, manager, pharmacist)
app.post('/medicine/search', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
})

// validate prescription (pharmacist)
app.post('/medicine/prescription', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
})


// Shopping cart

// add medicine to cart (customer)
app.post('/cart/add', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
})

// remove medicine from cart (customer)
app.post('/cart/remove', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
})

// update quantity (customer)
app.post('/cart/update-quantity', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
})

// checkout (customer)
app.post('/cart/checkout', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
})

// request validation for prescription on checkout (customer)
app.post('/cart/request-validation', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
})


// Credit card

// add credit card (customer)
app.post('/payment/add', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
})

// remove credit card (customer)
app.post('/payment/remove', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
})

// get payment methods (customer)
app.post('/payment/get', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
})


// Shipping Address

// add shipping address (customer)
app.post('/shipping/add', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
})

// remove shipping address (customer)
app.post('/shipping/remove', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
})

// get shipping address (customer)
app.post('/shipping/get', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
})


// Admin

// add user of any type (admin)
app.post('/admin/add', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
})

// remove user (admin)
app.post('/admin/remove', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
})

// update user (admin)
app.post('/admin/update', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
})

// get users (admin)
app.post('/admin/get', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
})


// Order

// get order status (customer)
app.post('/order/status/get', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
})

// update order status (manager, shipping company)
app.post('/order/status/update', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
})

// reorder (customer)
app.post('/order/reorder', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
})

// cancel order (customer)
app.post('/order/cancel', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
})


// Complaints

// launch complain (customer)
app.post('/complain/launch', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
})

// get complains (customer, manager)
app.post('/complain/get', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
})

// update status (manager)
app.post('/complain/update-status', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
})

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));