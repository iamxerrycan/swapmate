const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const {
  updateItemService,
  createItemService,
  getAllItemsService,
  getItemByIdService,
  markItemSwappedservice,
  getItemsByUserService,
} = require('../services/itemService');

//  Create a new item
const createItem = async (req, res) => {
  try {
    const userId = req.user._id; // from auth middleware
    const {
      name,
      category,
      description,
      address,
      coordinates, // expecting [longitude, latitude]
    } = req.body;

    const image = req.file?.filename || null; // if using multer for image upload

    const item = await createItemService({
      name,
      category,
      description,
      address,
      location: coordinates, // 👈 renamed for service compatibility
      image,
      userId,
    });

    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//  Get all items (optional filter)
const getAllItems = async (req, res) => {
  try {
    const { category, lat, lng, radius } = req.query;
    const items = await getAllItemsService({ category, lat, lng, radius });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  Get single item by ID
const getItemById = async (req, res) => {
  try {
    const item = await getItemByIdService(req.params.id);
    res.status(200).json(item);
  } catch (err) {
    res.status(404).json({ message: 'Item not found' });
  }
};

// Get items by user
const getItemsByUser = async (req, res) => {
  try {
    const userId = req.user._id; // from auth middleware
    console.log('Querying items for user:', userId);
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    const items = await getItemsByUserService(userId);
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  Controller to mark item as swapped
const markItemSwapped = async (req, res) => {
  try {
    const itemId = req.params.id; // item ID from URL
    if (!itemId) {
      return res.status(400).json({ message: 'Item ID is required' });
    }
    const { swappedWithUserId } = req.body;

    if (!itemId || !swappedWithUserId) {
      return res
        .status(400)
        .json({ message: 'itemId and swappedWithUserId are required' });
    }

    const updatedItem = await markItemSwappedservice(itemId, swappedWithUserId);

    if (!updatedItem) {
      return res
        .status(404)
        .json({ message: 'Item not found or could not be updated' });
    }

    res.status(200).json({
      message: 'Item marked as swapped successfully',
      item: updatedItem,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateItem = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // ✅ Check if ID is valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid item ID" });
  }

  const updateData = req.body;

  // ✅ Update the item
  const updatedItem = await Item.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  if (!updatedItem) {
    return res.status(404).json({ message: "Item not found" });
  }

  res.status(200).json(updatedItem);
});

module.exports = {
  updateItem,
  createItem,
  getAllItems,
  getItemById,
  getItemsByUser,
  markItemSwapped,
};
