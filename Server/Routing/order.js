var express = require('express')
var router = express.Router()


// get order status (customer)
router.post('/status/get', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
})

// update order status (manager, shipping company)
router.post('/status/update', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
})

// reorder (customer)
router.post('/reorder', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
})

// cancel order (customer)
router.post('/cancel', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
})

module.exports = router;