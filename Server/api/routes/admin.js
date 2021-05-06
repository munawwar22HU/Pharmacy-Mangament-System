const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('./../models/user');

// add user of any type (admin)
router.post('/add', (req, res) => {
    User.findById(req.body.id)
        .then((result) => {
            if (result === null || result.type !== 'admin') {
                console.log('Admin auth failed');
                res.send({ status: -1 });
                return;
            } else {
                User.findOne({ email: req.body.email })
                    .then((result) => {
                        if (result === null) {
                            const user = new User({
                                _id: new mongoose.Types.ObjectId(),
                                type: req.body.type,
                                email: req.body.email,
                                name: req.body.name,
                                password: req.body.password,
                                phone: req.body.phone,
                                cart: [],
                                shipping: [],
                                payment: []
                            });

                            user.save()
                                .then((result) => {
                                    console.log('User added by admin');
                                    res.send({ status: 0 });
                                    return;
                                });
                        } else {
                            console.log('Email already in use');
                            res.send({ status: -1 });
                            return;
                        }
                    });
            }
        })
        .catch((err) => {
            console.log('Admin auth failed');
            res.send({ status: -1 });
            return;
        });
});

// remove user (admin)
router.post('/remove', (req, res) => {
    User.findById(req.body.id)
        .then((result) => {
            if (result === null || result.type !== 'admin') {
                console.log('Admin auth failed');
                res.send({ status: -1 });
                return;
            } else {
                User.findByIdAndDelete(req.body.userId)
                    .then((result) => {
                        if (result === null) {
                            console.log('User does not exist');
                            res.send({ status: -1 });
                            return;
                        } else {
                            console.log('User deleted by admin');
                            res.send({ status: 0 });
                            return;
                        }
                    })
                    .catch((err) => {
                        console.log('User does not exist');
                        res.send({ status: -1 });
                        return;
                    });
            }
        })
        .catch((err) => {
            console.log('Admin auth failed');
            res.send({ status: -1 });
            return;
        });
});

// update user (admin)(drop)
router.post('/update', (req, res) => {
    User.findById(req.body.id)
        .then((result) => {
            if (result === null || result.type !== 'admin') {
                console.log('Admin auth failed');
                res.send({ status: -1 });
                return;
            } else {
                res.send({ status: 0 });
            }
        })
        .catch((err) => {
            console.log('Admin auth failed');
            res.send({ status: -1 });
            return;
        });
});

// get users (admin)
router.post('/get-users', (req, res) => {
    console.log(req.body.id)
    User.findById(req.body.id)
        .then((result) => {
            if (result === null || result.type !== 'admin') {
                console.log('Admin auth failed');
                res.send({ status: -1 });
                return;
            } else {
                if (req.body.type === '') {
                    User.find({$and: [ { _id: { '$ne': req.body.id } }, { type: { '$ne': 'user' } } ] },{cart:0,shipping:0,payment:0})
                    // $or: [ { status: "A" }, { qty: { $lt: 30 } } ]
                    // type: { '$ne': 'user' }
                        .then((result) => {
                            console.log('Users sent to admin');
                            console.log(result)
                            res.json({users: result });
                            return;
                        })
                        .catch((err) => {
                            console.log('Error');
                            res.json({ status: -1 });
                            return;
                        });
                } else {
                    User.find({ type: req.body.type })
                        .then((result) => {
                            console.log('Users sent to admin');
                            res.json({users: result });
                            return;
                        })
                        .catch((err) => {
                            console.log('Error');
                            res.json({ status: -1 });
                            return;
                        });
                }
                // User.find({ type: req.body.type })
                //     .then((result) => {
                //         console.log('Users sent to admin');
                //         res.send({ status: 0, data: result });
                //         return;
                //     })
                //     .catch((err) => {
                //         console.log('Error');
                //         res.send({ status: -1 });
                //         return;
                //     });
            }
        })
        .catch((err) => {
            console.log('Admin auth failed');
            res.json({ status: -1 });
            return;
        });
});

module.exports = router;