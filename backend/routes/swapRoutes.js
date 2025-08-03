// 📁 routes/swapRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createSwap,
  acceptSwap,
  rejectSwap,
} = require('../controllers/swapController');

// Create new swap request
router.post('/', protect, createSwap);

// Accept a swap request
router.put('/:id/accept', protect, acceptSwap);

// Reject a swap request
router.put('/:id/reject', protect, rejectSwap);

module.exports = router;
