const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    profilePic: {
      type: String,
      default: '', // profile image URL
    },
    bio: {
      type: String,
      maxlength: 200,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    lastSeen: Date,
    // Forgot password fields
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.index({ email: 1 });

const User = mongoose.model('User', userSchema);
module.exports = User;
