var express = require('express');
const { Mongoose } = require('mongoose');
const complain = require('../models/complain');
const user = require('../models/user');
var router = express.Router();


// launch complain (customer)
// router.post('/launch', (req, res) => {
//     let data = req.body;
//     res.send({ status: 0 });
// })

router.post('/launch', (req, res) => {
    user.findById(req.body.id)
    .then((result) => {
        if (result === null || result.type != 'user'){
            console.log('User auth failed');
            console.log('1st');
            res.send({status:-1});
            return;            
        } else {
            const complain = new complain({
                _id: new Mongoose.Types.ObjectId(),
                userId: req.body.userId,
                title: req.body.title,
                description: req.body.description,
                launchDate: Date(req.body.launchDate),
                resolved: Boolean(req.body.resolved)
            });

            complain.save()
            .then((result) => {
                console.log('Complain registered by user');
                res.send({status: 0});
                return;
            })
            .catch((err) => {
                console.log('Failed to regiter complain');
                res.send({status: -1});
                return;
            });
        }
    })
    .catch((err) => {
        console.log('User auth failed');
        console.log('1st');
        res.send({status:-1});
        return;
    });
});
    


// get complains (customer, manager)
router.post('/get', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
})

// update status (manager)
router.post('/update-status', (req, res) => {
    let data = req.body;
    res.send({ status: 0 });
})

module.exports = router;