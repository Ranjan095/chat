const { privateChatHandler } = require("./privateChat");
const { publicChatHandler } = require("./publicChat");
const { roomChatHandler } = require("./roomChat");

const socketIoHandlers = (io) => {
  publicChatHandler(io);
  privateChatHandler(io);
  roomChatHandler(io);
};

module.exports = { socketIoHandlers };
