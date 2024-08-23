const mongoose = require("mongoose");

// Connect to MongoDB
const connectDB = async () => {
  try {
    // MongoDB connection string
    const connection = await mongoose.connect(process.env.MOONGOOSE_URI, {});
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = { connectDB };
