const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String }, // optional: for private chat
  roomId: { type: String }, // optional: for room messages
  isPrivate: { type: Boolean, default: false },
  time: { type: Date, default: Date.now },
});

const Messages = mongoose.model("Messages", messageSchema);
module.exports = Messages;
