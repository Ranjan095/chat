require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./dbConnect");
const cors = require("cors");
const { socketIoHandlers } = require("./soket/soket");

// MongoDB connection and server start
const PORT = process.env.PORT || 3000;

// Setup
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Your React app URL (Vite)
    methods: ["GET", "POST"],
  },
});

socketIoHandlers(io);

// Middleware
app.use(cors());
app.use(express.json());

// REST API
app.get("/api", async (req, res) => {
  try {
    return res.status(200).send({
      status: true,
      message: "request success",
    });
  } catch (error) {
    return res.status(400).send({
      status: false,
      message: error.message || "Something went wrong!",
    });
  }
});

const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ MongoDB connected");

    server.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
