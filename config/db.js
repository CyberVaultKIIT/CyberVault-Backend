const mongoose = require('mongoose');
const Logger = require('../utils/Logger')

const connectDB = async () => {
  try {
    Logger.log("Connecting to the database");
    await mongoose.connect(process.env.MONGO_URL);
    Logger.log('MongoDB Connected!');
  } catch (err) {
    Logger.error(err.message);
  }
};

module.exports = connectDB;
