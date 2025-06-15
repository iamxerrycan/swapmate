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

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

itemSchema.index({ location: '2dsphere' }); // geo location index

module.exports = mongoose.model('Item', itemSchema);
