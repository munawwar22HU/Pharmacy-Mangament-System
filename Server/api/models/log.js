const mongoose = require('mongoose');

const logSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    requestType: String,
    dateTime: Date,
    params: String
})

module.exports = mongoose.model('Medicine', logSchema);