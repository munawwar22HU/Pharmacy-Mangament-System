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
                    description: req.body.medicine,
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

// update medicine description (pharmacist)
router.post('/update-description', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
});

// update quantity (manager)
router.post('/update-quantity', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
});

// search medicine (if no search string is provided get all medicines) (customer, manager, pharmacist)
router.post('/search', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
});

// validate prescription (pharmacist)
router.post('/prescription', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
});

module.exports = router;