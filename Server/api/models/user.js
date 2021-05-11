const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    type: String,
    email: String,
    name: String,
    password: String,
    phone: String,
    userImage: String,
    cart: [{
        medicineId: mongoose.Schema.Types.ObjectId,
        name: String,
        description: String,
        price: Number,
        quantity: Number,
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

userSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});


module.exports = mongoose.model('User', userSchema);