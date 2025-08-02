const mongoose = require('mongoose');
const Logger = require('../utils/Logger')

const connectDB = async () => {
  try {
    // Check if MONGO_URL is available
    if (!process.env.MONGO_URL) {
      Logger.error("MONGO_URL environment variable is not defined");
      process.exit(1);
    }
    
    Logger.log("Connecting to the database");
    await mongoose.connect(process.env.MONGO_URL);
    Logger.log('MongoDB Connected!');
  } catch (err) {
    Logger.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
