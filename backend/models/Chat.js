const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // exactly 2 users
    swapId: { type: mongoose.Schema.Types.ObjectId, ref: "Swap" }, // optional, agar kisi swap se judi chat hai
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);


