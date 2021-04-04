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

var admin = require('./Routing/admin');
var auth = require('./Routing/auth');
var cart = require('./Routing/cart');
var complain = require('./Routing/complain');
var medicine = require('./Routing/medicine');
var order = require('./Routing/order');
var payment = require('./Routing/payment');
var shipping = require('./Routing/shipping');

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

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));