const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId,
    medicine: [{
        medicineId: mongoose.Types.ObjectId,
        quantity: Number
    }],
    totalAmount: Number,
    shipping: mongoose.Types.ObjectId,
    payment: mongoose.Types.ObjectId,
    shippingCompany: String
})

module.exports = mongoose.model('Order', orderSchema);