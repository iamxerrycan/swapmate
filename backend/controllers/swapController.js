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

// @desc    Create new swap request
// @route   POST /api/swaps
// @access  Private
exports.createSwapRequest = async (req, res) => {
  try {
    // console.log('Request body controller:', req.body);
    const swap = await createSwapRequestService(req.body);
    res.status(201).json(swap);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserSwapRequests = async (req, res) => {
  try {
    const userId = req.user?._id; // logged in user id yahin se lena hai
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

// @desc    Get all swap requests for a user
// @route   GET /api/swaps/user/:userId
// @access  Private
// exports.getUserSwapRequests = async (req, res) => {
//   try {
//     const swaps = await getUserSwapRequestsService(req.params.userId);
//     res.status(200).json(swaps);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// @desc    Get single swap request by ID
// @route   GET /api/swaps/:id
// @access  Private
exports.getSwapById = async (req, res) => {
  try {
    const swap = await getSwapByIdService(req.params.id);
    res.status(200).json(swap);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Accept a swap
// @route   PUT /api/swaps/:id/accept
// @access  Private
exports.acceptSwap = async (req, res) => {
  try {
    const swap = await acceptSwapService(req.params.id);
    res.status(200).json(swap);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Reject a swap
// @route   PUT /api/swaps/:id/reject
// @access  Private
exports.rejectSwap = async (req, res) => {
  try {
    const swap = await rejectSwapService(req.params.id);
    res.status(200).json(swap);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Cancel a swap (by sender)
// @route   PUT /api/swaps/:id/cancel
// @access  Private
exports.cancelSwap = async (req, res) => {
  try {
    const swap = await cancelSwapService(req.params.id, req.user._id);
    res.status(200).json(swap);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Delete a swap (soft delete)
// @route   DELETE /api/swaps/:id
// @access  Private
exports.deleteSwap = async (req, res) => {
  try {
    const swap = await deleteSwapService(req.params.id);
    res.status(200).json(swap);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Admin: Get all swap requests
// @route   GET /api/swaps
// @access  Admin
exports.getAllSwaps = async (req, res) => {
  try {
    const swaps = await getAllSwapsService();
    res.status(200).json(swaps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
