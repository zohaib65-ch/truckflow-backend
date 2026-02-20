const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const { languageMiddleware } = require("./utils/i18n");

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(languageMiddleware);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const loadRoutes = require("./routes/loadRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const exportRoutes = require("./routes/exportRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const seedRoutes = require("./routes/seedRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/loads", loadRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/exports", exportRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/seed", seedRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
    timestamp: new Date().toISOString(),
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

module.exports = app;
