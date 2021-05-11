const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('./../models/user');
const multer = require('multer');
const shortid = require('shortid');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './profiles/');
    },
    filename: function(req, file, cb) {
        cb(null, shortid.generate() + file.originalname);
    }
})
const upload = multer({ storage: storage });

router.use('/image', express.static('profiles'));

// add user of any type (admin)
router.post('/add', upload.single('userImage'), (req, res) => {
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
                                userImage: req.file.filename,
                                cart: [],
                                shipping: [],
                                payment: []
                            });
                            console.log(user);
                            user.save()
                                .then((result) => {
                                    console.log('User added by admin');
                                    res.json({ message: 'User added by admin' });
                                    return;
                                });
                        } else {
                            console.log('Email already in use');
                            res.send({ message: 'Email already in use' });
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
                    User.find({ $and: [{ _id: { '$ne': req.body.id } }, { type: { '$ne': 'user' } }] }, { cart: 0, shipping: 0, payment: 0 })
                        .then((result) => {
                            console.log('Users sent to admin');
                            console.log(result)
                            res.json({ users: result });
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
                            res.json({ users: result });
                            return;
                        })
                        .catch((err) => {
                            console.log('Error');
                            res.json({ status: -1 });
                            return;
                        });
                }
            }
        })
        .catch((err) => {
            console.log('Admin auth failed');
            res.json({ status: -1 });
            return;
        });
});

module.exports = router;