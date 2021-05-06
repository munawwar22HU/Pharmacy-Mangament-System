const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const Medicine = require('./../models/medicine');


// add medicine to cart (customer)
router.post('/add', (req, res) => {
    Medicine.findById(req.body.medicineId)
        .then((result) => {
            if (result === null) {
                console.log('Medicine does not exist');
                res.send({ status: -1 });
                return;
            } else {
                var medicineName = result['name'];
                var medicineDescription = result['description'];
                var medicinePrice = result['price'];
                User.findById(req.body.id)
                    .then((result) => {
                        if (result === null || result.type !== 'user') {
                            console.log('User auth failed');
                            res.send({ status: -1 });
                            return;
                        } else {
                            // console.log('Medicine deleted by pharmacist');
                            // res.send({ status: 0 });
                            // return;
                            // result['cart'].push('test');
                            console.log('Medicine name', medicineName);
                            result['cart'].push({
                                medicineId: req.body.medicineId,
                                name: medicineName,
                                description: medicineDescription,
                                price: medicinePrice,
                                quantity: req.body.quantity,
                                prescription: req.body.prescription
                            });

                            User.findByIdAndUpdate(req.body.id, {
                                    cart: result['cart']
                                }, {
                                    upsert: false,
                                    useFindAndModify: false,
                                    new: true
                                },
                                (err, doc) => {
                                    if (doc === null) {
                                        console.log('Add to cart failed');
                                        res.send({ status: -1 });
                                        return;
                                    } else {
                                        console.log('Medicine added to cart');
                                        res.send({ status: 0 });
                                        return;
                                    }
                                });
                            return;
                        }
                    })
                    .catch((err) => {
                        console.log('Medicine does not exist');
                        res.send({ status: -1 });
                        return;
                    });
            }
        })
        .catch((err) => {
            console.log('Medicine does not exist');
            res.send({ status: -1 });
            return;
        });
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