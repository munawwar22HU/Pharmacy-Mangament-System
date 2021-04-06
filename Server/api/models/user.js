const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    type: String,
    email: String,
    password: String,
    userName: String,
    phone: String,
    cart: [{
        name: String,
        description: String,
        price: Number,
        quantity: String,
        prescription: String
    }],
    shipping: [{
        address: String,
        name: String,
        phone: String,
        country: String,
        city: String
    }],
    payment: [{
        nameOnCard: String,
        cardNumber: String,
        CVV: String,
        expiryDate: Date
    }]
})

module.exports = mongoose.model('User', userSchema);