var express = require('express')
var router = express.Router()


// check user credentials and handle login (any user)
router.post('/login', (req, res) => {
    let data = req.body;
    console.log('login request');
    res.send({ status: 0 });
})

// create a new user account (customer)
router.post('/register', (req, res) => {
    let data = req.body;
    console.log('register request');
    res.send({ status: 0 });
})

module.exports = router;