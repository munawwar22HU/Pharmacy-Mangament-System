const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const Medicine = require('./../models/medicine');
const multer = require('multer');
const shortid = require('shortid');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, shortid.generate() + file.originalname);
    }
})
const upload = multer({ storage: storage });

// get medicine image
router.use('/image', express.static('uploads'));

// add new medicine (pharmacist)
router.post('/add', upload.single('medicineImage'), (req, res) => {
    // console.log(req.file);

    User.findById(req.body.id)
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
                    medicineImage: req.file.filename,
                    prescription: Boolean(req.body.prescription),
                    price: Number(req.body.price),
                    stockquantity: Number(req.body.stockquantity)
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
    User.findById(req.body.id)
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
    User.findById(req.body.id)
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
    User.findById(req.body.id)
        .then((result) => {
            if (result === null || result.type !== 'manager') {
                console.log('Manager auth failed');
                res.send({ status: -1 });
                return;
            } else {
                Medicine.findByIdAndUpdate(req.body.medicineId, {
                        stockquantity: Number(req.body.stockquantity)
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
router.get('/search', (req, res) => {
    Medicine.find({})
        .then((result1) => {
            if (result1 === null) {
                console.log('No medicine found');
                res.send({ status: -1 });
                return;
            } else {
                console.log('Medicine Found');
                res.json({
                    products: result1
                });
                //console.log(result1);
                return;
            }
        })
        .catch((err) => {
            console.log('Search faled');
            res.send({ status: -1 });
            return;
        })
});

// router.post('/single', (req, res) => {
//     Medicine.findById(req.body.id)
//         .then((result1) => {
//             if (result1 === null) {
//                 console.log('No medicine found');
//                 res.send({ status: -1 });
//                 return;
//             } else {
//                 console.log('Medicine Found line 223');
//                 res.json({
//                     id: result1.id,
//                     name: result1.name,
//                     description: result1.description,
//                     prescription: result1.prescription,
//                     price: result1.price,
//                     stockquantity: result1.stockQuantity
//                 });


//                 return;
//             }
//         })
//         .catch((err) => {
//                 console.log('Search faled');
//                 res.send({ status: -1 });
//                 return;
//             } else {
//                 console.log('Medicine Found');
//                 res.json({
//                     id: result1.id,
//                     name: result1.name,
//                     description: result1.description,
//                     prescription: result1.prescription,
//                     price: result1.price,
//                     stockquantity: result1.stockquantity
//                 });


//                 return;
//             }
//         })
// .catch((err) => {
//     console.log('Search failed');
//     res.send({ status: -1 });
//     return;
// })



// });


// validate prescription (pharmacist)
router.post('/prescription', (req, res) => {
    User.findById(req.body.id)
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