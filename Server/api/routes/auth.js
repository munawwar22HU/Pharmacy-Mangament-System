const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('./../models/user');

// check user credentials and handle login (any user)
router.post('/login', (req, res) => {
    User.findOne({ email: req.body.email, password: req.body.password })
        .then((result) => {
            if (result === null) {
                console.log('Login failed');
                res.send({ status: -1 });
                return;
            } else {
                console.log('Login successful');
                res.send({ status: 0, data: result });
                return;
            }
        })
        .catch((err) => {
            console.log('Login faled');
            res.send({ status: -1 });
            return;
        })
});

// create a new user account (customer)
router.post('/register', (req, res) => {
    User.findOne({ email: req.body.email })
        .then((result) => {
            if (result === null) {
                const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    type: 'user',
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
                        console.log('User registered');
                        res.send({ status: 0 });
                        return;
                    });
            } else {
                console.log('Email already in use');
                res.send({ status: -1 });
                return;
            }
        });
});

module.exports = router;