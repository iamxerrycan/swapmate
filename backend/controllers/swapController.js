// controllers/swapController.js

const asyncHandler = require("express-async-handler");
const {
  createSwapRequestService,
  getUserSwapRequestsService,
  getSwapByIdService,
  acceptSwapService,
  rejectSwapService,
  cancelSwapService,
  deleteSwapService,
  getAllSwapsService,
} = require("../services/swapService");

// @desc    Create new swap request
// @route   POST /api/swaps
// @access  Private
exports.createSwapRequest = asyncHandler(async (req, res) => {
  const { senderItemId, receiverItemId, receiverId } = req.body;
  const senderId = req.user._id;

  const swap = await createSwapRequestService({
    senderId,
    senderItemId,
    receiverItemId,
    receiverId,
  });

  res.status(201).json(swap);
});

// @desc    Get all swap requests for a user
// @route   GET /api/swaps/user/:userId
// @access  Private
exports.getUserSwapRequests = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const swaps = await getUserSwapRequestsService(userId);
  res.status(200).json(swaps);
});

// @desc    Get single swap request by ID
// @route   GET /api/swaps/:id
// @access  Private
exports.getSwapById = asyncHandler(async (req, res) => {
  const swap = await getSwapByIdService(req.params.id);
  res.status(200).json(swap);
});

// @desc    Accept a swap
// @route   PUT /api/swaps/:id/accept
// @access  Private
exports.acceptSwap = asyncHandler(async (req, res) => {
  const result = await acceptSwapService(req.params.id);
  res.status(200).json(result);
});

// @desc    Reject a swap
// @route   PUT /api/swaps/:id/reject
// @access  Private
exports.rejectSwap = asyncHandler(async (req, res) => {
  const result = await rejectSwapService(req.params.id);
  res.status(200).json(result);
});

// @desc    Cancel a swap (by sender)
// @route   PUT /api/swaps/:id/cancel
// @access  Private
exports.cancelSwap = asyncHandler(async (req, res) => {
  const result = await cancelSwapService(req.params.id, req.user._id);
  res.status(200).json(result);
});

// @desc    Delete a swap (soft delete)
// @route   DELETE /api/swaps/:id
// @access  Private
exports.deleteSwap = asyncHandler(async (req, res) => {
  const result = await deleteSwapService(req.params.id);
  res.status(200).json(result);
});

// @desc    Admin: Get all swap requests
// @route   GET /api/swaps
// @access  Admin
exports.getAllSwaps = asyncHandler(async (req, res) => {
  const swaps = await getAllSwapsService();
  res.status(200).json(swaps);
});
