// controllers/swapController.js
const SwapRequest = require('../models/swapModel');
const {
  createSwapRequestService,
  getUserSwapRequestsService,
  getSwapByIdService,
  acceptSwapService,
  rejectSwapService,
  cancelSwapService,
  deleteSwapService,
  getAllSwapsService,
} = require('../services/swapService');

// Create new swap request
exports.createSwapRequest = async (req, res) => {
  try {
    const swap = await createSwapRequestService(req.body);
    res.status(201).json(swap);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get swap requests for logged-in user
exports.getUserSwapRequests = async (req, res) => {
  try {
    const userId = req.user?._id;
    const swaps = await SwapRequest.find({
      $or: [{ fromUser: userId }, { toUser: userId }],
    })
      .populate('fromUser', 'name email')
      .populate('toUser', 'name email')
      .populate('fromItem')
      .populate('toItem');

    res.status(200).json(swaps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single swap request by ID
exports.getSwapById = async (req, res) => {
  try {
    const swap = await getSwapByIdService(req.params.id);
    res.status(200).json(swap);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Accept a swap
exports.acceptSwap = async (req, res) => {
  try {
    const swap = await acceptSwapService(req.params.id);
    res.status(200).json(swap);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Reject a swap
exports.rejectSwap = async (req, res) => {
  try {
    const swap = await rejectSwapService(req.params.id);
    res.status(200).json(swap);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cancel a swap (by sender)
exports.cancelSwap = async (req, res) => {
  try {
    const swap = await cancelSwapService(req.params.id, req.user._id);
    res.status(200).json(swap);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a swap
exports.deleteSwap = async (req, res) => {
  try {
    const swap = await deleteSwapService(req.params.id);
    res.status(200).json(swap);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin: Get all swap requests
exports.getAllSwaps = async (req, res) => {
  try {
    const swaps = await getAllSwapsService();
    res.status(200).json(swaps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
