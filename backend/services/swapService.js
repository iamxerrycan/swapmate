// services/swapService.js

const Swap = require("../models/swapModel");
const Item = require("../models/itemModel");

// Create a swap request
exports.createSwapRequestService = async ({ senderId, senderItemId, receiverItemId, receiverId }) => {
  // Check if items exist
  const senderItem = await Item.findById(senderItemId);
  const receiverItem = await Item.findById(receiverItemId);

  if (!senderItem || !receiverItem) {
    throw new Error("One or both items not found");
  }

  const newSwap = await Swap.create({
    sender: senderId,
    senderItem: senderItemId,
    receiver: receiverId,
    receiverItem: receiverItemId,
    status: "pending",
  });

  return newSwap;
};

// Get all swap requests for a user
exports.getUserSwapRequestsService = async (userId) => {
  const swaps = await Swap.find({
    $or: [{ sender: userId }, { receiver: userId }],
  })
    .populate("sender", "name email")
    .populate("receiver", "name email")
    .populate("senderItem")
    .populate("receiverItem");

  return swaps;
};

// Get swap by ID
exports.getSwapByIdService = async (swapId) => {
  const swap = await Swap.findById(swapId)
    .populate("sender", "name email")
    .populate("receiver", "name email")
    .populate("senderItem")
    .populate("receiverItem");

  if (!swap) {
    throw new Error("Swap not found");
  }

  return swap;
};

// Accept a swap
exports.acceptSwapService = async (swapId) => {
  const swap = await Swap.findById(swapId);
  if (!swap) throw new Error("Swap not found");

  swap.status = "accepted";
  await swap.save();
  return { message: "Swap accepted", swap };
};

// Reject a swap
exports.rejectSwapService = async (swapId) => {
  const swap = await Swap.findById(swapId);
  if (!swap) throw new Error("Swap not found");

  swap.status = "rejected";
  await swap.save();
  return { message: "Swap rejected", swap };
};

// Cancel a swap
exports.cancelSwapService = async (swapId, userId) => {
  const swap = await Swap.findById(swapId);
  if (!swap) throw new Error("Swap not found");

  if (String(swap.sender) !== String(userId)) {
    throw new Error("Only the sender can cancel this swap");
  }

  swap.status = "cancelled";
  await swap.save();
  return { message: "Swap cancelled", swap };
};

// Delete a swap (soft delete or hard depending on use-case)
exports.deleteSwapService = async (swapId) => {
  const swap = await Swap.findByIdAndDelete(swapId);
  if (!swap) throw new Error("Swap not found");
  return { message: "Swap deleted", swap };
};

// Admin: get all swaps
exports.getAllSwapsService = async () => {
  return await Swap.find()
    .populate("sender", "name email")
    .populate("receiver", "name email")
    .populate("senderItem")
    .populate("receiverItem");
};
