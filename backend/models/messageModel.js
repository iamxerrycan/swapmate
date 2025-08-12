// const mongoose = require('mongoose');

// const messageSchema = new mongoose.Schema(
//   {
//     chatId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Chat', // Optional: if you're grouping messages by chat thread
//     },
//     reactions: [
//       {
//         emoji: { type: String },
//         user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//       },
//     ],
//     replyTo: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Message',
//     },

//     sender: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//     },
//     receiver: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//     },
//     content: {
//       type: String,
//     },
//     media: {
//       type: String, // URL of image or file
//     },
//     deletedBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//     },
//     deletedAt: Date,
//     isRead: {
//       type: Boolean,
//       default: false,
//     },
//     blocked: {
//       type: Boolean,
//       default: false, // sender or receiver can block each other
//     },
//   },
//   {
//     timestamps: true, // createdAt, updatedAt
//   }
// );

// messageSchema.index({ sender: 1 });
// messageSchema.index({ receiver: 1 });
// messageSchema.index({ chatId: 1 });

// const Message = mongoose.model('Message', messageSchema);
// module.exports = Message;


const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
   readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('Message', messageSchema);

