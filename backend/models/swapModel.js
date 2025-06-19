// 📁 models/swapRequestModel.js
const mongoose = require('mongoose');

const swapRequestSchema = new mongoose.Schema({
  fromUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  toUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fromItem: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  toItem: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected', 'Cancelled'],
    default: 'Pending'
  },
  message: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('SwapRequest', swapRequestSchema);

// 📁 services/swapService.js
const SwapRequest = require('../models/swapRequestModel');

const createSwapRequestService = async ({ fromUser, toUser, fromItem, toItem, message }) => {
  return await SwapRequest.create({ fromUser, toUser, fromItem, toItem, message });
};

const getMySwapRequestsService = async (userId) => {
  return await SwapRequest.find({ fromUser: userId })
    .populate('fromItem')
    .populate('toItem')
    .populate('toUser', 'name email');
};

const getSwapRequestsForMeService = async (userId) => {
  return await SwapRequest.find({ toUser: userId })
    .populate('fromItem')
    .populate('toItem')
    .populate('fromUser', 'name email');
};

const updateSwapRequestStatusService = async (id, status) => {
  return await SwapRequest.findByIdAndUpdate(id, { status }, { new: true });
};

module.exports = {
  createSwapRequestService,
  getMySwapRequestsService,
  getSwapRequestsForMeService,
  updateSwapRequestStatusService,
};

// 📁 controllers/swapController.js
const {
  createSwapRequestService,
  getMySwapRequestsService,
  getSwapRequestsForMeService,
  updateSwapRequestStatusService,
} = require('../services/swapService');

const createSwapRequest = async (req, res) => {
  try {
    const { fromItem, toItem, message, toUser } = req.body;
    const fromUser = req.user._id;

    const swap = await createSwapRequestService({ fromUser, toUser, fromItem, toItem, message });
    res.status(201).json(swap);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getMySwapRequests = async (req, res) => {
  try {
    const userId = req.user._id;
    const requests = await getMySwapRequestsService(userId);
    res.json(requests);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getRequestsForMe = async (req, res) => {
  try {
    const userId = req.user._id;
    const requests = await getSwapRequestsForMeService(userId);
    res.json(requests);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateSwapRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // Accept / Reject / Cancel
    const updated = await updateSwapRequestStatusService(id, status);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  createSwapRequest,
  getMySwapRequests,
  getRequestsForMe,
  updateSwapRequestStatus,
};

// 📁 routes/swapRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createSwapRequest,
  getMySwapRequests,
  getRequestsForMe,
  updateSwapRequestStatus,
} = require('../controllers/swapController');

router.post('/', protect, createSwapRequest);
router.get('/my', protect, getMySwapRequests);
router.get('/incoming', protect, getRequestsForMe);
router.put('/:id/status', protect, updateSwapRequestStatus);

module.exports = router;

// 📁 main app file (e.g., app.js)
// Add route:
// const swapRoutes = require('./routes/swapRoutes');
// app.use('/api/swaps', swapRoutes);
