const http = require("http");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { initializeSocket } = require("./config/socket");
const app = require("./app");

// Load env vars
dotenv.config();

const server = http.createServer(app);

// Initialize Socket.io
initializeSocket(server);

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
      console.log("WebSocket server initialized");
    });
  })
  .catch((error) => {
    console.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  });
