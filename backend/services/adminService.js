const User = require('../models/userModel');
const Item = require('../models/itemModel');

// Get all users
const getAllUsersService = async () => {
  return await User.find({}, '-password'); // Exclude password field
};
// Get all items
const getAllItemsService = async () => {
  return await Item.find().populate('user', 'name email'); // Populate user details
};

// delete a user
const deleteUserService = async (userId) => {
  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};
// delete an item
const deleteItemService = async (itemId) => {
  const item = await Item.findByIdAndDelete(itemId);
  if (!item) {
    throw new Error('Item not found');
  }
  return item;
};
// Update user role
const updateUserRoleService = async (userId, isAdmin) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { isAdmin },
    { new: true, runValidators: true }
  );
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

// adminService.js
const blockUserService = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  if (user.isBlocked) {
    throw new Error('User is already blocked');
  }

  user.isBlocked = true;
  await user.save();
  return user;
};
// Unblock a user
const unblockUserService = async (userId) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { isBlocked: false },
    { new: true }
  );
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

// Get admin stats
const getAdminStatsService = async () => {
  const userCount = await User.countDocuments();
  const itemCount = await Item.countDocuments();
  return { userCount, itemCount };
};

module.exports = {
  getAllUsersService,
  getAllItemsService,
  deleteUserService,
  deleteItemService,
  updateUserRoleService,
  blockUserService,
  unblockUserService,
  getAdminStatsService,
};
