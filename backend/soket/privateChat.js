const privateChatHandler = (io) => {
  io.on("connection", (socket) => {
    socket.on("private_message", ({ toSocketId, text, from }) => {
      io.to(toSocketId).emit("private_message", {
        from,
        text,
        time: new Date().toLocaleTimeString(),
      });
    });
  });
};

module.exports = { privateChatHandler };
