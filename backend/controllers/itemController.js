const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const Item = require('../models/itemModel');
const Activity = require('../models/ActivityModel');
const {
  markItemSwappedService,
  deleteItemService,
  updateItemService,
  createItemService,
  getAllItemsService,
  getItemByIdService,
  getItemsByUserService,
} = require('../services/itemService');

// Create a new item
exports.createItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, category, description, address, coordinates } = req.body;
    const image = req.file?.filename || null;

    const item = await createItemService({
      name,
      category,
      description,
      address,
      location: coordinates,
      image,
      userId,
    });

    await Activity.create({
      description: `Created a new item: ${name}`,
      user: userId,
    });

    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all items with optional filters
exports.getAllItems = async (req, res) => {
  try {
    const { category, lat, lng, radius } = req.query;
    const items = await getAllItemsService({ category, lat, lng, radius });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single item by ID
exports.getItemById = async (req, res) => {
  try {
    const item = await getItemByIdService(req.params.id);
    res.status(200).json(item);
  } catch (err) {
    res.status(404).json({ message: 'Item not found' });
  }
};

// Get items by logged-in user
exports.getItemsByUser = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    const items = await getItemsByUserService(userId);
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Mark item as swapped
exports.markItemSwapped = async (req, res) => {
  try {
    const itemId = req.params.id;
    const { swappedWithUserId } = req.body;

    if (!itemId || !swappedWithUserId) {
      return res
        .status(400)
        .json({ message: 'itemId and swappedWithUserId are required' });
    }

    const updatedItem = await markItemSwappedService(itemId, swappedWithUserId);

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

// Update item
exports.updateItem = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid item ID' });
  }

  let updateData = { ...req.body };

  if (req.body.coordinates) {
    updateData.location = {
      type: 'Point',
      coordinates: req.body.coordinates,
    };
    delete updateData.coordinates;
  }

  if (req.file?.filename) {
    updateData.image = req.file.filename;
  }

  const updatedItem = await updateItemService(id, updateData);

  if (!updatedItem) {
    return res.status(404).json({ message: 'Item not found' });
  }

  res.status(200).json(updatedItem);
});

// Delete item by ID
exports.deleteItem = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: 'Invalid item ID' });
    }

    const deletedItem = await Item.findByIdAndDelete(itemId);

    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json({ message: 'Item deleted successfully', item: deletedItem });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get items by specific user ID
exports.getItemsBySpecificUser = async (req, res) => {
  try {
    const items = await Item.find({ user: req.params.id });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
