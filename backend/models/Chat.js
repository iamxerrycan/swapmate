const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // always 2 users
    swapId: { type: mongoose.Schema.Types.ObjectId, ref: "Swap" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);
