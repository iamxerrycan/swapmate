const User = require('../models/userModel');
const crypto = require('crypto');
const generateResetToken = require('../utils/generateResetToken');

const updateUserProfileService = async (userId, updateData) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  user.name = updateData.name || user.name;
  user.email = updateData.email || user.email;

console.log("Before Save", user);
const updatedUser = await user.save();
console.log("After Save", updatedUser);


  return {
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
  };
};


// 🔐 Forgot Password: Generate reset token and update user
const forgotPasswordService = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }

  const { rawToken, hashedToken } = generateResetToken();

  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  await user.save();

  const resetLink = `http://localhost:5173/reset-password/${rawToken}`;
  return resetLink; // In real app, send this via email
};

// 🔁 Reset Password: Match token, validate expiry, and reset password
const resetPasswordService = async (token, newPassword) => {
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new Error('Invalid or expired token');
  }

  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();
  return user;
};

module.exports = {
  updateUserProfileService,
  forgotPasswordService,
  resetPasswordService
};
