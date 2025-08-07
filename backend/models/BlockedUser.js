const mongoose = require('mongoose');

const blockedUserSchema = new mongoose.Schema(
  {
    blocker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    blocked: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // when user blocked the other
  }
);

blockedUserSchema.index({ blocker: 1 });
blockedUserSchema.index({ blocked: 1 });

const BlockedUser = mongoose.model('BlockedUser', blockedUserSchema);

module.exports = BlockedUser;
