const {
   getAllUsersService,
  getAllItemsService,
  deleteUserService,
  deleteItemService,
  updateUserRoleService
} = require('../services/adminService');

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersService();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Get all items
const getAllItems = async (req, res) => {
  try {
    const items = await getAllItemsService();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Delete a user
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id; // User ID from URL
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    const user = await deleteUserService(userId);
    res.status(200).json({ message: 'User deleted successfully', user });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
// Delete an item
const deleteItem = async (req, res) => {
  try {
    const itemId = req.params.id; // Item ID from URL
    if (!itemId) {
      return res.status(400).json({ message: 'Item ID is required' });
    }
    const item = await deleteItemService(itemId);
    res.status(200).json({ message: 'Item deleted successfully', item });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
// Update user role
const updateUserRole = async (req, res) => {
  try {
    const userId = req.params.id; // User ID from URL
    const { isAdmin } = req.body; // New role from request body

    if (!userId || typeof isAdmin !== 'boolean') {
      return res.status(400).json({ message: 'User ID and isAdmin are required' });
    }

    const updatedUser = await updateUserRoleService(userId, isAdmin);
    res.status(200).json({ message: 'User role updated successfully', user: updatedUser });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
module.exports = {
  getAllUsers,
  getAllItems,
  deleteUser,
  deleteItem,
  updateUserRole
};