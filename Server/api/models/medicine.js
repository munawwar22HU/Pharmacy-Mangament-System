const mongoose = require('mongoose');

const medicineSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    description: String,
    prescription: Boolean,
    price: Number,
    stockQuantity: Number,
    URL: String
})
medicineSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

module.exports = mongoose.model('Medicine', medicineSchema);
//return 
// const Tutorial = mongoose.model('Medicine', medicineSchema);
// return Tutorial;