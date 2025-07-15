require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./dbConnect");
const cors = require("cors");

// Setup
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Your React app URL (Vite)
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection and server start
const PORT = process.env.PORT || 3000;

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

// 💬 Socket.IO logic
io.on("connection", (socket) => {
  console.log("🔌 Client connected:", socket.id);

  socket.emit(
    "message",
    `📩 Hello from server (${new Date().toLocaleTimeString()})`
  );

  socket.on("send_message", (msg) => {
    console.log("📥 Received message from client:", msg);
    // Example: broadcast it
    socket.broadcast.emit("message", `🗣️ ${msg}`);
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});
