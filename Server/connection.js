const mongoose = require('mongoose');

const URI = 'mongodb+srv://admin:admin@project-db.of5wa.mongodb.net/SE-Project?retryWrites=true&w=majority';

const connectDB = () => {
    mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('DB Connected');
}

module.exports = connectDB;