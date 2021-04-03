var express = require('express')
var router = express.Router()


// add shipping address (customer)
router.post('/add', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
})

// remove shipping address (customer)
router.post('/remove', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
})

// get shipping address (customer)
router.post('/get', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
})

module.exports = router;