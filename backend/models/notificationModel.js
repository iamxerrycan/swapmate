//notification model

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
  isSeen: { type: Boolean, default: false },
  actionURL: { type: String },

  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['message', 'swap_request', 'swap_update', 'system'],
    default: 'system',
  },
  relatedItem: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
  relatedSwap: { type: mongoose.Schema.Types.ObjectId, ref: 'SwapRequest' },

  isRead: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
