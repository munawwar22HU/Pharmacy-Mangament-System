const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./connection');

// connectDB();

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

var admin = require('./api/routes/admin');
var auth = require('./api/routes/auth');
var cart = require('./api/routes/cart');
var complain = require('./api/routes/complain');
var medicine = require('./api/routes/medicine');
var order = require('./api/routes/order');
var payment = require('./api/routes/payment');
var shipping = require('./api/routes/shipping');

app.use((req, res, next) => {
    console.log('Logger');
    next();
})

app.use('/admin', admin);
app.use('/auth', auth);
app.use('/cart', cart);
app.use('/complain', complain);
app.use('/medicine', medicine);
app.use('/order', order);
app.use('/payment', payment);
app.use('/shipping', shipping);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    connectDB();
});