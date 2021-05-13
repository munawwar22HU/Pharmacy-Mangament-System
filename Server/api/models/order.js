const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId,
    medicine: [{
        medicineId: mongoose.Types.ObjectId,
        quantity: Number
    }],
    totalAmount: Number,
    status: String
        
})

orderSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});
module.exports = mongoose.model('Order', orderSchema);