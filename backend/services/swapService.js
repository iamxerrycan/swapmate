const SwapRequest = require('../models/swapModel');
const Item = require('../models/itemModel');

exports.createSwapRequestService = async ({
  fromUser,
  toUser,
  fromItem,
  toItem,
  status,
  message,
}) => {
  if (!fromUser || !toUser || !toItem) {
    throw new Error('Missing required fields');
  }

  let fromItemDoc = null;
  if (fromItem) {
    fromItemDoc = await Item.findById(fromItem);
    if (!fromItemDoc) {
      throw new Error('From item not found');
    }
  }

  const toItemDoc = await Item.findById(toItem);
  if (!toItemDoc) {
    throw new Error('To item not found');
  }

  const newSwap = await SwapRequest.create({
    fromUser,
    fromItem: fromItem || null, // Make optional
    toUser,
    toItem,
    status: status || 'Pending',
    message: message || '',
  });

  return newSwap;
};

// Get all swap requests for a user
exports.getUserSwapRequestsService = async (userId) => {
  const swaps = await SwapRequest.find({
    $or: [{ fromUser: userId }, { toUser: userId }],
  })
    .populate('fromUser', 'name email')
    .populate('toUser', 'name email')
    .populate('fromItem')
    .populate('toItem');

  return swaps;
};

// Get swap by ID
exports.getSwapByIdService = async (swapId) => {
  const swap = await SwapRequest.findById(swapId)
    .populate('fromUser', 'name email')
    .populate('toUser', 'name email')
    .populate('fromItem')
    .populate('toItem');

  if (!swap) {
    throw new Error('Swap not found');
  }

  return swap;
};

// Accept a swap
exports.acceptSwapService = async (swapId) => {
  const swap = await SwapRequest.findById(swapId);
  if (!swap) throw new Error('Swap not found');

  swap.status = 'Accepted';
  await swap.save();

  return { message: 'Swap accepted', swap };
};

// Reject a swap
exports.rejectSwapService = async (swapId) => {
  const swap = await SwapRequest.findById(swapId);
  if (!swap) throw new Error('Swap not found');

  swap.status = 'Rejected';
  await swap.save();
  return { message: 'Swap rejected', swap };
};

// Cancel a swap
exports.cancelSwapService = async (swapId, userId) => {
  const swap = await SwapRequest.findById(swapId);
  if (!swap) throw new Error('Swap not found');

  if (String(swap.fromUser) !== String(userId)) {
    throw new Error('Only the sender can cancel this swap');
  }

  swap.status = 'Cancelled';
  await swap.save();
  return { message: 'Swap cancelled', swap };
};

// Delete a swap (soft delete or hard depending on use-case)
exports.deleteSwapService = async (swapId) => {
  const swap = await SwapRequest.findByIdAndDelete(swapId);
  if (!swap) throw new Error('Swap not found');
  return { message: 'Swap deleted', swap };
};

// Admin: get all swaps
exports.getAllSwapsService = async () => {
  return await SwapRequest.find()
    .populate('fromUser', 'name email')
    .populate('toUser', 'name email')
    .populate('fromItem')
    .populate('toItem');
};
