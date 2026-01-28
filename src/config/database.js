const mongoose = require('mongoose');
const env = require('./env');

const connectDB = async () => {
  try {
    await mongoose.connect(env.mongoUri, {
      autoIndex: false,
    });

    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed');
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
