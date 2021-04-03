var express = require('express')
var router = express.Router()


// add user of any type (admin)
router.post('/add', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
})

// remove user (admin)
router.post('/remove', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
})

// update user (admin)
router.post('/update', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
})

// get users (admin)
router.post('/get-users', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
})

module.exports = router;