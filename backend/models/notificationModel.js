const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
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
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['message', 'swap', 'swap_request', 'swap_update', 'system'],
    default: 'system',
  },
  actionURL: { type: String },
  relatedItem: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
  relatedSwap: { type: mongoose.Schema.Types.ObjectId, ref: 'SwapRequest' },
  isSeen: { type: Boolean, default: false },
  isRead: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Notification', notificationSchema);
