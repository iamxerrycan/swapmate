const User = require("../models/userModel");
const bcrypt = require("bcrypt");

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
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  // Update fields
  if (updatedData.name) user.name = updatedData.name;
  if (updatedData.email) user.email = updatedData.email;

  // Hash password if provided
  if (updatedData.password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(updatedData.password, salt);
  }

  const updatedUser = await user.save();
  updatedUser.password = undefined; // Don't send password
  return updatedUser;
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
  updateProfileService,
  getMeService,
  updateProfileService,
  deleteAccountService,
  getAllUsersService,
  getUserByIdService
};
