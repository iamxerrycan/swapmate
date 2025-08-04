// const User = require('../models/userModel');
// const generateResetToken = require('../utils/generateResetToken');
// const crypto = require('crypto');
const {
 getMeService,
  updateProfileService,
  deleteAccountService,
  getAllUsersService,
  getUserByIdService
} = require('../services/userService');

const getMe = async (req, res) => {
  try {
    const user = await getMeService(req.user._id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id; // from auth middleware
    const { name, email, password } = req.body;
    const updatedUser = await updateProfileService(userId, { name, email, password });
    res.status(200).json({ message: 'User profile updated successfully', user: updatedUser });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const userId = req.user._id; // from auth middleware
    const user = await deleteAccountService(userId);
    res.status(200).json({ message: 'User deleted successfully', user });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersService();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id; // User ID from URL
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    const user = await getUserByIdService(userId);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


module.exports = {
  getMe,
  updateProfile,
  deleteAccount,
  getAllUsers,
  getUserById,
};

