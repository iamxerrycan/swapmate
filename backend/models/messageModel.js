const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat', // Optional: if you're grouping messages by chat thread
    },
    reactions: [
      {
        type: String, // like "❤️", "👍", "😂"
      },
    ],
    replyTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
    },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
    },
    media: {
      type: String, // URL of image or file
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    blocked: {
      type: Boolean,
      default: false, // sender or receiver can block each other
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

messageSchema.index({ sender: 1 });
messageSchema.index({ receiver: 1 });
messageSchema.index({ chatId: 1 });

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
