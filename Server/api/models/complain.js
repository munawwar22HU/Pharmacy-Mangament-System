const mongoose = require('mongoose');

const complainSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId,
    title: String,
    description: String,
    launchDate: Date,
    resolved: Boolean
})

module.exports = mongoose.model('Complain', complainSchema);