const mongoose = require("mongoose");

const getMongoUri = () => {
  return process.env.MONGODB_URI || process.env.MONGO_URI || process.env.MONGO_URL || process.env.DATABASE_URL;
};

const connectDB = async () => {
  try {
    const mongoUri = getMongoUri();

    if (!mongoUri || typeof mongoUri !== "string") {
      throw new Error("MongoDB connection string is missing. Set one of: MONGODB_URI, MONGO_URI, MONGO_URL, DATABASE_URL.");
    }

    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
