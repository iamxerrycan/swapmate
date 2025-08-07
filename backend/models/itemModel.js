const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Books', 'Electronics', 'Clothes', 'Toys', 'Food', 'Other'],
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  description: String,
  image: String, // image URL or filename

  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
  address: String,

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  isSwapped: {
    type: Boolean,
    default: false,
  },
  swappedWith: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  swapDate: {
    type: Date,
    default: null,
  },

  // Swap Request Info
  swapRequestFor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item', // The item this item wants to be swapped with
    default: null,
  },
  swapStatus: {
    type: String,
    enum: ['None', 'Pending', 'Accepted', 'Rejected', 'Completed'],
    default: 'None',
  },
  type: {
    type: String,
    enum: ['Giveaway', 'Request', 'Swap'],
    default: 'Swap',
  },
  tags: [String], // e.g. ["used", "clean", "rare"]
  condition: {
    type: String,
    enum: ['New', 'Like New', 'Used', 'Broken'],
    default: 'Used',
  },
  changeLog: [
    {
      changedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      changes: mongoose.Schema.Types.Mixed,
      changedAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  hasSwapRequest: {
    type: Boolean,
    default: false,
  },
});

// Indexes for faster queries and sorting
itemSchema.index({ location: '2dsphere' });
itemSchema.index({ owner: 1 });
itemSchema.index({ category: 1 });
itemSchema.index({ status: 1 });

module.exports = mongoose.model('Item', itemSchema);
