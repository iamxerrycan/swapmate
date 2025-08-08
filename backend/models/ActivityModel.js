// models/Activity.js
const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    time: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Activity', activitySchema);
