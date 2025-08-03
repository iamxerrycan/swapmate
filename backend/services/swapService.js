const Swap = require('../models/swapModel');
const Item = require('../models/itemModel');

const isDuplicateSwap = async (fromItem, toItem) => {
  return await Swap.findOne({ fromItem, toItem, status: 'pending' });
};

const createSwap = async (fromItem, toItem) => {
  const existing = await isDuplicateSwap(fromItem, toItem);
  if (existing) {
    throw new Error('Swap request already exists');
  }

  const swap = await Swap.create({
    fromItem,
    toItem,
    status: 'pending',
  });

  return swap;
};

const acceptSwap = async (swapId) => {
  const swap = await Swap.findById(swapId);
  if (!swap) throw new Error('Swap not found');
  if (swap.status !== 'pending') throw new Error('Swap is already processed');

  swap.status = 'accepted';
  await swap.save();

  // Optional: Auto mark items as unavailable
  await Promise.all([
    Item.findByIdAndUpdate(swap.fromItem, { available: false }),
    Item.findByIdAndUpdate(swap.toItem, { available: false }),
  ]);

  return swap;
};

const rejectSwap = async (swapId) => {
  const swap = await Swap.findById(swapId);
  if (!swap) throw new Error('Swap not found');
  if (swap.status !== 'pending') throw new Error('Swap is already processed');

  swap.status = 'rejected';
  await swap.save();

  return swap;
};

module.exports = {
  createSwap,
  acceptSwap,
  rejectSwap,
};
