const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const user = require('../models/user');
const Medicine = require('./../models/medicine');


// add new medicine (pharmacist)
router.post('/add', (req, res) => {
    user.findById(req.body.id)
        .then((result) => {
            if (result === null || result.type !== 'pharmacist') {
                console.log('Pharmacist auth failed');
                console.log('test');
                res.send({ status: -1 });
                return;
            } else {
                const medicine = new Medicine({
                    _id: new mongoose.Types.ObjectId(),
                    name: req.body.name,
                    description: req.body.description,
                    prescription: Boolean(req.body.prescription),
                    price: Number(req.body.price),
                    stockQuantity: Number(req.body.stockQuantity)
                });

                medicine.save()
                    .then((result) => {
                        console.log('Medicine added by pharmacist');
                        res.send({ status: 0 });
                        return;
                    })
                    .catch((err) => {
                        console.log('Failed to add medicine');
                        res.send({ status: -1 });
                        return;
                    });
            }
        })
        .catch((err) => {
            console.log('Pharmacist auth failed');
            res.send({ status: -1 });
            return;
        });
});

// remove medicine (pharmacist)
router.post('/remove', (req, res) => {
    user.findById(req.body.id)
        .then((result) => {
            if (result === null || result.type !== 'pharmacist') {
                console.log('Pharmacist auth failed');
                console.log('test');
                res.send({ status: -1 });
                return;
            } else {
                Medicine.findByIdAndDelete(req.body.medicineId)
                    .then((result) => {
                        if (result === null) {
                            console.log('Medicine does not exist');
                            res.send({ status: -1 });
                            return;
                        } else {
                            console.log('Medicine deleted by pharmacist');
                            res.send({ status: 0 });
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
            console.log('Pharmacist auth failed');
            res.send({ status: -1 });
            return;
        });
});

// update medicine details (pharmacist)
router.post('/update-medicine', (req, res) => {
    user.findById(req.body.id)
        .then((result) => {
            if (result === null || result.type !== 'pharmacist') {
                console.log('Pharmacist auth failed');
                res.send({ status: -1 });
                return;
            } else {
                Medicine.findByIdAndUpdate(req.body.medicineId, {
                        name: req.body.name,
                        description: req.body.description,
                        prescription: Boolean(req.body.prescription),
                        price: Number(req.body.price)
                    }, {
                        upsert: false,
                        useFindAndModify: false,
                        new: true
                    },
                    (err, doc) => {
                        if (doc === null) {
                            console.log('Medicine does not exist');
                            res.send({ status: -1 });
                            return;
                        } else {
                            console.log('Medicine updated by pharmacist');
                            res.send({ status: 0 });
                            return;
                        }
                    });
            }
        })
        .catch((err) => {
            console.log('Pharmacist auth failed');
            res.send({ status: -1 });
            return;
        });
});

// update quantity (manager)
router.post('/update-quantity', (req, res) => {
    user.findById(req.body.id)
        .then((result) => {
            if (result === null || result.type !== 'manager') {
                console.log('Manager auth failed');
                res.send({ status: -1 });
                return;
            } else {
                Medicine.findByIdAndUpdate(req.body.medicineId, {
                        stockQuantity: Number(req.body.stockQuantity)
                    }, {
                        upsert: false,
                        useFindAndModify: false,
                        new: true
                    },
                    (err, doc) => {
                        if (doc === null) {
                            console.log('Medicine does not exist');
                            res.send({ status: -1 });
                            return;
                        } else {
                            console.log('Medicine quantity updated by manager');
                            res.send({ status: 0 });
                            return;
                        }
                    });
            }
        })
        .catch((err) => {
            console.log('Manager auth failed');
            res.send({ status: -1 });
            return;
        });
});

// search medicine (if no search string is provided get all medicines) (customer, manager, pharmacist)
router.post('/search', (req, res) => {
    user.findById(req.body.id)
        .then((result) => {
            if (result === null || result.type !== 'pharmacist') {
                console.log('Pharmacist auth failed');
                console.log('test');
                res.send({ status: -1 });
                return;
            } else {
                // add code here
            }
        })
        .catch((err) => {
            console.log('Pharmacist auth failed');
            res.send({ status: -1 });
            return;
        });
});

// validate prescription (pharmacist)
router.post('/prescription', (req, res) => {
    user.findById(req.body.id)
        .then((result) => {
            if (result === null || result.type !== 'pharmacist') {
                console.log('Pharmacist auth failed');
                console.log('test');
                res.send({ status: -1 });
                return;
            } else {
                // add code here
            }
        })
        .catch((err) => {
            console.log('Pharmacist auth failed');
            res.send({ status: -1 });
            return;
        });
});

module.exports = router;