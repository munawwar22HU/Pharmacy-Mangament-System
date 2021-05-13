const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const Medicine = require('./../models/medicine');
const Order = require('./../models/order');

// get customer cart
router.post('/get', (req, res) => {
    User.findById(req.body.id)
        .then((result) => {
            if (result === null || result.type !== 'user') {
                res.send({ status: -1 });
                return;
            } else {
                res.send({ status: 0, cart: result['cart'] });
                return;
            }
        });
});


// add medicine to cart (customer)
router.post('/add', (req, res) => {
    console.log('add medicine');
    Medicine.findById(req.body.medicineId)
        .then((result) => {
            if (result === null) {
                console.log('Medicine does not exist');
                res.send({ message: 'Medicne does not exist' });
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
                                        res.send({ message: 'Add to cart failed' });
                                        return;
                                    } else {
                                        console.log('Medicine added to cart');
                                        res.json({ message: 'Medicine added to cart' });
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
    User.findById(req.body.id)
        .then((result) => {
            if (result === null || result.type !== 'user') {
                console.log('User does not exist');
                res.send({ status: -1 });
                return;
            } else {
                for (i = 0; i < result.cart.length; i++) {
                    if (String(result.cart[i].medicineId) === req.body.medicineId) {
                        result.cart.splice(i, 1);
                        User.findByIdAndUpdate(req.body.id, {
                                cart: result.cart
                            }, {
                                upsert: false,
                                useFindAndModify: false,
                                new: true
                            },
                            (err, doc) => {
                                if (doc === null) {
                                    console.log('Remove from cart failed');
                                    res.send({ status: -1 });
                                    return;
                                } else {
                                    console.log('Medicine removed from cart');
                                    res.send({ status: 0 });
                                    return;
                                }
                            });
                        return;
                    }
                }
                console.log('Medicine not found in cart');
                res.send({ status: -1 });
                return;
            }
        });
});

// update quantity (customer)
router.post('/update-quantity', (req, res) => {
    User.findById(req.body.id)
        .then((result) => {
            if (result === null || result.type !== 'user') {
                console.log('User does not exist');
                res.send({ status: -1 });
                return;
            } else {
                for (i = 0; i < result.cart.length; i++) {
                    if (String(result.cart[i].medicineId) === req.body.medicineId) {
                        result.cart[i].quantity = req.body.quantity;
                        User.findByIdAndUpdate(req.body.id, {
                                cart: result.cart
                            }, {
                                upsert: false,
                                useFindAndModify: false,
                                new: true
                            },
                            (err, doc) => {
                                if (doc === null) {
                                    console.log('Failed to update quantity');
                                    res.send({ status: -1 });
                                    return;
                                } else {
                                    console.log('Medicine quantity updated');
                                    res.send({ status: 0 });
                                    return;
                                }
                            });
                        return;
                    }
                }
                console.log('Medicine not found in cart');
                res.send({ status: -1 });
                return;
            }
        });
});

// checkout (customer)
router.post('/checkout', (req, res) => {
    User.findById(req.body.id)
        .then((result) => {
            if (result === null || result.type !== 'user') {
                console.log('User does not exist');
                res.send({ status: -1 });
                return;
            } else {
                totalAmount = 0;
                orderMedicine = [];
                if (result.cart.length === 0) {
                    console.log('Order not placed as cart is empty');
                    res.send({ status: -1 });
                    return;
                }
                for (i = 0; i < result.cart.length; i++) {
                    totalAmount += result.cart[i].quantity * result.cart[i].price;
                    orderMedicine.push({
                        medicineId: result.cart[i].medicineId,
                        quantity: result.cart[i].quantity
                    });
                }
                User.findByIdAndUpdate(req.body.id, {
                        cart: []
                    }, {
                        upsert: false,
                        useFindAndModify: false,
                        new: true
                    },
                    (err, doc) => {
                        if (doc === null) {
                            console.log('Failed to empty cart');
                            res.send({ status: -1 });
                            return
                        } else {
                            console.log('Cart emptied');
                        }
                    });
                const order = new Order({
                    _id: new mongoose.Types.ObjectId(),
                    userId: req.body.id,
                    medicine: orderMedicine,
                    totalAmount: totalAmount
                });

                order.save()
                    .then((result) => {
                        console.log('Order placed');
                        res.json({message: 'Order placed' });
                        // res.send({ status: 0 });
                        return;
                    });
            }
        });
});

// request validation for prescription on checkout (customer)
router.post('/request-validation', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
})

module.exports = router;