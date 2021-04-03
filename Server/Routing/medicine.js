var express = require('express')
var router = express.Router()


// add new medicine (pharmacist)
router.post('/add', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
})

// remove medicine (pharmacist)
router.post('/remove', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
})

// update medicine description (pharmacist)
router.post('/update-description', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
})

// update quantity (manager)
router.post('/update-quantity', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
})

// search medicine (if no search string is provided get all medicines) (customer, manager, pharmacist)
router.post('/search', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
})

// validate prescription (pharmacist)
router.post('/prescription', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
})

module.exports = router;