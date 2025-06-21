const User = require('../models/userModel');
const {updateUserProfileService} = require('../services/userService');
const generateResetToken = require('../utils/generateResetToken');
const crypto = require('crypto');
const { forgotPasswordService, resetPasswordService } = require('../services/userService');
// @desc    Update logged-in user's profile
// @route   PUT /api/users/me
// @access  Private
const updateUserProfileController = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming req.user is set by the protect middleware
    const updateData = req.body;
console.log('Incoming body:', req.body);
console.log('Decoded user:', req.user);

    const updatedUser = await updateUserProfileService(userId, updateData);

    res.status(200).json({
      message: 'User profile updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



// 🔐 Forgot Password Controller
const forgotPasswordController = async (req, res) => {
  try {
    const resetLink = await forgotPasswordService(req.body.email);
    res.json({ message: 'Reset link sent', link: resetLink });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// 🔁 Reset Password Controller
const resetPasswordController = async (req, res) => {
  try {
    await resetPasswordService(req.params.token, req.body.password);
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


module.exports = {
  updateUserProfileController,
  forgotPasswordController,
  resetPasswordController
};