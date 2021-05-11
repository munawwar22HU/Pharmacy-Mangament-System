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

// check user credentials and handle login (any user)
router.post('/login', (req, res) => {
    console.log(req.body.email);
    console.log(req.body.password);
    User.findOne({ email: req.body.email, password: req.body.password })
        .then((result) => {
            if (result === null) {
                console.log(result);
                res.json('Login failed');
                return;
            } else {
                console.log('Login successful');
                res.json({ auth: true, email: result.email, name: result.name, phone: result.phone, type: result.type, id: result.id, userImage: result.userImage });
                return;
            }
        })
        .catch((err) => {
            res.json('Login failed');
            return;
        })
});

// create a new user account (customer)
router.post('/register', upload.single('userImage'), (req, res) => {
    // console.log(req.body);
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
                    userImage: req.file.filename,
                    cart: [],
                    shipping: [],
                    payment: []
                });

                user.save()
                    .then((result) => {
                        res.json({ message: 'User registered' });
                        console.log('User registered');
                        // res.send({ status: 0 });
                        return;
                    });
            } else {
                res.json({ message: 'Email Already in use' });
                // res.send({ status: -1 });
                return;
            }
        })
        .catch((err) => {
            console.log('Register failed');
            res.send({ status: -1 });
            return;
        });
});


router.post('/get-user', (req, res) => {
    User.findById(req.body.id)
        .then((result) => {
            if (result === null) {
                console.log('User not found');
                res.send({ status: -1 });
                return;
            } else {
                console.log('User found');
                res.send({
                    status: 0,
                    user: result
                });
                return;
            }
        })
        .catch((err) => {
            console.log('User not found');
            res.send({ status: -1 });
            return;
        })
});


module.exports = router;