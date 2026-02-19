const mongoose = require("mongoose");

const MONGO_ENV_KEYS = ["MONGODB_URI", "MONGODB_URL", "MONGO_URI", "MONGO_URL", "DATABASE_URL", "DATABASE_URI", "DB_URI", "DB_URL"];

const getMongoUri = () => {
  for (const key of MONGO_ENV_KEYS) {
    const value = process.env[key];
    if (typeof value === "string" && value.trim().length > 0) {
      return value;
    }
  }

  return undefined;
};

const getPresentMongoKeys = () => {
  return MONGO_ENV_KEYS.filter((key) => {
    const value = process.env[key];
    return typeof value === "string" && value.trim().length > 0;
  });
};

const connectDB = async () => {
  try {
    const mongoUri = getMongoUri();

    if (!mongoUri || typeof mongoUri !== "string") {
      const presentKeys = getPresentMongoKeys();
      const presentKeysText = presentKeys.length > 0 ? presentKeys.join(", ") : "none";

      throw new Error(`MongoDB connection string is missing. Set one of: ${MONGO_ENV_KEYS.join(", ")}. Mongo-like keys currently present: ${presentKeysText}.`);
    }

    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
