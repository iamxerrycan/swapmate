const User = require('../models/userModel');
// const crypto = require('crypto');
// const generateResetToken = require('../utils/generateResetToken');


const getMeService = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get user');
  }
};


const updateProfileService = async (userId, updatedData) => {
  try {
    const user = await User.findByIdAndUpdate(userId, updatedData, { new: true });
    return user;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to update user profile');
  }
};

const deleteAccountService = async (userId) => {
  try {
    const user = await User.findByIdAndDelete(userId);
    return user;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to delete user account');
  }
};

const getAllUsersService = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get users');
  }
};

const getUserByIdService = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get user by ID');
  }
};

module.exports = {
 getMeService,
  updateProfileService,
  deleteAccountService,
  getAllUsersService,
  getUserByIdService
};
