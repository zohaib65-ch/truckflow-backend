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

let connectionPromise;

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (connectionPromise) {
    return connectionPromise;
  }

  const mongoUri = getMongoUri();

  if (!mongoUri || typeof mongoUri !== "string") {
    const presentKeys = getPresentMongoKeys();
    const presentKeysText = presentKeys.length > 0 ? presentKeys.join(", ") : "none";

    throw new Error(`MongoDB connection string is missing. Set one of: ${MONGO_ENV_KEYS.join(", ")}. Mongo-like keys currently present: ${presentKeysText}.`);
  }

  connectionPromise = mongoose
    .connect(mongoUri)
    .then((conn) => {
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      return conn.connection;
    })
    .catch((error) => {
      connectionPromise = undefined;
      console.error(`Database connection error: ${error.message}`);
      throw error;
    });

  return connectionPromise;
};

module.exports = connectDB;
