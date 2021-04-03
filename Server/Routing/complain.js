var express = require('express')
var router = express.Router()


// launch complain (customer)
router.post('/launch', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
})

// get complains (customer, manager)
router.post('/get', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
})

// update status (manager)
router.post('/update-status', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
})

module.exports = router;