// routes/swapRoute.js

const express = require("express");
const router = express.Router();
const {
  createSwapRequest,
  getAllSwaps,
  getUserSwapRequests,
  getSwapById,
  acceptSwap,
  rejectSwap,
  cancelSwap,
  deleteSwap,
} = require("../controllers/swapController");

const { protect } = require('../middleware/authMiddleware');

// Create a swap request
router.post('/sendrequest', (req, res, next) => {
  console.log('🔥 Incoming swap request');
  next();
}, createSwapRequest);


// Get all swaps (admin or for dashboard)
router.get("/swaps", protect, getAllSwaps);

// Get current user's swaps
router.get("/my", protect, getUserSwapRequests);

// Get specific swap by ID
router.get("/:id", protect, getSwapById);

// Accept a swap
router.put("/:id/accept", protect, acceptSwap);

// Reject a swap
router.put("/:id/reject", protect, rejectSwap);

// Cancel a swap (by sender)
router.put("/:id/cancel", protect, cancelSwap);

// Delete a swap
router.delete("/:id", protect, deleteSwap);

module.exports = router;


