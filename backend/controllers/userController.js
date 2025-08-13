// controllers/userController.js
const {
  getMeService,
  updateProfileService,
  deleteAccountService,
  getAllUsersService,
} = require('../services/userService');
const User = require('../models/userModel');
const Item = require('../models/itemModel');
const SwapRequest = require('../models/swapModel');
const mongoose = require('mongoose');

// Get logged-in user's details
exports.getMe = async (req, res) => {
  try {
    const user = await getMeService(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, email, password } = req.body;

    const updatedUser = await updateProfileService(userId, { name, email, password });
    if (!updatedUser) return res.status(404).json({ message: 'User not found or update failed' });

    res.status(200).json({ message: 'User profile updated successfully', user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete user account
exports.deleteAccount = async (req, res) => {
  try {
    const deletedUser = await deleteAccountService(req.user._id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersService();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user stats
exports.getUserStats = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const [listed, swapped, pending, rejected, accepted, fulfilled, cancelled] =
      await Promise.all([
        Item.countDocuments({ user: userId, isDeleted: false }),
        Item.countDocuments({ user: userId, isSwapped: true, isDeleted: false }),
        SwapRequest.countDocuments({ fromUser: userId, status: 'Pending' }),
        SwapRequest.countDocuments({ fromUser: userId, status: 'Rejected' }),
        SwapRequest.countDocuments({ fromUser: userId, status: 'Accepted' }),
        SwapRequest.countDocuments({ fromUser: userId, status: 'Completed' }),
        SwapRequest.countDocuments({ fromUser: userId, status: 'Cancelled' }),
      ]);

    res.json({ listed, swapped, pending, rejected, accepted, fulfilled, cancelled });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get profile completion percentage
exports.getProfileCompletion = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).lean();
    if (!user) return res.status(404).json({ message: 'User not found' });

    const totalFields = 4;
    const filledFields = ['name', 'email', 'profilePic', 'bio'].filter(field => user[field]).length;
    const completion = Math.round((filledFields / totalFields) * 100);

    res.json({ completion });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search users by name or email
exports.searchUsers = async (req, res) => {
  try {
    const q = req.query.q?.trim();
    if (!q) return res.json([]);
    const users = await User.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } },
      ],
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
