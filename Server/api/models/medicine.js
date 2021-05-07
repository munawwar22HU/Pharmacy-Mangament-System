const mongoose = require('mongoose');

const medicineSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    description: String,
    medicineImage: String,
    prescription: Boolean,
    price: Number,
    stockquantity: Number,
    URL: String
})
medicineSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model('Medicine', medicineSchema);
