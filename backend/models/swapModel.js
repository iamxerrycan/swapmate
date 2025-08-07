const mongoose = require('mongoose');

const swapRequestSchema = new mongoose.Schema({
  fromUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  toUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  fromItem: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' }, // optional
  toItem: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' }, // optional

  message: String,
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected', 'Cancelled', 'Completed'],
    default: 'Pending',
  },
  changeLog: [
    {
      changedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      changes: mongoose.Schema.Types.Mixed,
      changedAt: { type: Date, default: Date.now },
    },
  ],
  isDeletedByFromUser: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  isDeletedByToUser: {
    type: Boolean,
    default: false,
  },

  createdAt: { type: Date, default: Date.now, timestamps: true },
});

swapRequestSchema.index({ fromUser: 1 });
swapRequestSchema.index({ toUser: 1 });

module.exports = mongoose.model('SwapRequest', swapRequestSchema);


