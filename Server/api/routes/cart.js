var express = require('express');
var router = express.Router();


// add medicine to cart (customer)
router.post('/add', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
})

// remove medicine from cart (customer)
router.post('/remove', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
})

// update quantity (customer)
router.post('/update-quantity', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
})

// checkout (customer)
router.post('/checkout', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
})

// request validation for prescription on checkout (customer)
router.post('/request-validation', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
})

module.exports = router;