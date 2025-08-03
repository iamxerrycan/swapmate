const User = require('../models/userModel');
const generateResetToken = require('../utils/generateResetToken');
const crypto = require('crypto');
const {
  forgotPasswordService,
  updateUserProfileService,
  resetPasswordService,
  deleteUserProfileService,
} = require('../services/userService');
const { deleteUser } = require('./adminController');

const updateUserProfileController = async (req, res) => {
  try {
    const userId = req.user._id;
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

// 🗑️ Delete User Profile Controller
const deleteUserProfileController = async (req, res) => {
  try {
    console.log("🧠 Trying to delete user:", req.user._id);

    console.log('🧠 req.user:', req.user); // Check the user ID coming from token
    const deletedUser = await deleteUserProfileService(req.user._id);
    res.json({ message: 'User deleted successfully', user: deletedUser });
  } catch (error) {
    console.error('❌ Error deleting user:', error);
    res.status(400).json({ message: error.message });
  }
};


module.exports = {
  updateUserProfileController,
  forgotPasswordController,
  resetPasswordController,
  deleteUserProfileController,
};
