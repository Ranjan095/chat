const publicChatHandler = (io) => {
  io.on("connection", (socket) => {
    // console.log("🔌 Client connected:", socket.id);

    socket.on("send_message", ({ username, text }) => {
      const message = {
        username,
        text,
        time: new Date().toLocaleTimeString(),
      };
      console.log("📥 Message received:", message);

      io.emit("message", message); // Broadcast to all
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected:", socket.id);
    });
  });
};

module.exports = { publicChatHandler };
