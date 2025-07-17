const Messages = require("../model/messageModel");

const publicChatHandler = (io) => {
  io.on("connection", (socket) => {
    // console.log("🔌 Client connected:", socket.id);

    socket.on("send_message", async ({ username, text }) => {
      const message = {
        from: username,
        text,
        isPrivate: false,
        time: new Date(),
      };

      console.log("📥 Message received:", message);
      await Messages.create(message);
      io.emit("message", message); // Broadcast to all
    });

    socket.on("load_public_chat", async () => {
      const recentMessages = await Messages.find({ isPrivate: false })
        .sort({ time: -1 })
        .limit(20)
        .lean();

      // Send to client
      socket.emit("chat_history", recentMessages.reverse()); // oldest first
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected:", socket.id);
    });
  });
};

module.exports = { publicChatHandler };
