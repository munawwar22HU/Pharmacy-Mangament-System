require('dotenv').config();
const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI || process.env.MONGO_URI;

if (!URI) {
  console.error("❌ MongoDB Connection URI is not defined. Please set MONGODB_URI or MONGO_URI in your .env file");
  process.exit(1);
}

const connectDB = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000
    });

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
