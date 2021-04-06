const mongoose = require('mongoose');

const medicineSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    description: String,
    prescription: Boolean,
    price: Number,
    stockQuantity: Number
})

module.exports = mongoose.model('Medicine', medicineSchema);