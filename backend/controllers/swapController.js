const swapService = require('../services/swapService');

// @desc    Create new swap request
const createSwap = async (req, res) => {
  const { fromItem, toItem } = req.body;

  if (!fromItem || !toItem) {
    return res.status(400).json({ message: 'Both fromItem and toItem are required' });
  }

  try {
    const swap = await swapService.createSwap(fromItem, toItem);
    res.status(201).json(swap);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Accept swap request
const acceptSwap = async (req, res) => {
  try {
    const swap = await swapService.acceptSwap(req.params.id);
    res.json({ message: 'Swap accepted successfully', swap });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Reject swap request
const rejectSwap = async (req, res) => {
  try {
    const swap = await swapService.rejectSwap(req.params.id);
    res.json({ message: 'Swap rejected successfully', swap });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createSwap,
  acceptSwap,
  rejectSwap,
};
