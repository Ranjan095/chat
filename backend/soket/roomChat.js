const roomChatHandler = (io) => {
  io.on("connection", (socket) => {
    socket.on("join_room", (roomId) => {
      socket.join(roomId);
      console.log(`🧑‍🤝‍🧑 ${socket.id} joined room ${roomId}`);
    });

    socket.on("send_room_message", ({ roomId, text, username }) => {
      const message = {
        username,
        text,
        time: new Date().toLocaleTimeString(),
      };
      io.to(roomId).emit("room_message", message);
    });
  });
};

module.exports = { roomChatHandler };
