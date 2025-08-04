// routes/swapRoute.js

const express = require("express");
const router = express.Router();
const {
  createSwapRequest,
  getAllSwaps,
  getUserSwaps,
  getSwapById,
  acceptSwap,
  rejectSwap,
  cancelSwap,
  deleteSwap,
} = require("../controllers/swapController");

const { protect } = require("../middlewares/authMiddleware"); // Auth middleware

// Create a swap request
router.post("/", protect, createSwapRequest);

// Get all swaps (admin or for dashboard)
router.get("/", protect, getAllSwaps);

// Get current user's swaps
router.get("/my", protect, getUserSwaps);

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
