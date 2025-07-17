module.exports = function typingIndicatorHandler(io) {
  io.on("connection", (socket) => {
    socket.on("typing", ({ roomId, username }) => {
      socket.to(roomId).emit("show_typing", { username });
    });

    socket.on("stop_typing", ({ roomId, username }) => {
      socket.to(roomId).emit("hide_typing", { username });
    });
  });
};
