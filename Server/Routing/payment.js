var express = require('express')
var router = express.Router()


// add credit card (customer)
router.post('/add', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
})

// remove credit card (customer)
router.post('/remove', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
})

// get payment methods (customer)
router.post('/get', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
})

module.exports = router;