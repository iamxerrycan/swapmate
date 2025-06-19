const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  getAllItems,
  deleteUser,
  deleteItem,
  updateUserRole,
} = require('../controllers/adminController');

const { protect, adminOnly } = require('../middleware/authMiddleware');

// @route GET /api/admin/users
router.get('/users', protect, adminOnly, getAllUsers);
// @route GET /api/admin/items
router.get('/items', protect, adminOnly, getAllItems);
// @route DELETE /api/admin/users/:id
router.delete('/users/:id', protect, adminOnly, deleteUser);
// @route DELETE /api/admin/items/:id
router.delete('/items/:id', protect, adminOnly, deleteItem);
// @route PUT /api/admin/users/:id/role
router.put('/users/:id/role', protect, adminOnly, updateUserRole);

module.exports = router;
