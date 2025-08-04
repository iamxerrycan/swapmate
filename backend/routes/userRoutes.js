const express = require('express');
const router = express.Router();
const { adminOnly } = require('../middleware/authMiddleware');
const { protect } = require('../middleware/authMiddleware');
const {
  getMe,
  updateProfile,
  deleteAccount,
  getAllUsers,
  getUserById,
} = require('../controllers/userController');

router.get('/me', protect, getMe); // Get logged-in user info
router.put('/me', protect, updateProfile); // Update profile
router.delete('/me', protect, deleteAccount); // Delete own account

router.get('/', protect,adminOnly, getAllUsers); // Admin only
router.get('/:id', protect, getUserById); // User/Admin

module.exports = router;

