const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const Item = require('../models/itemModel');
const {
  markItemSwappedService,
  deleteItemService,
  updateItemService,
  createItemService,
  getAllItemsService,
  getItemByIdService,
  getItemsByUserService,
} = require('../services/itemService');
const Activity = require('../models/ActivityModel');

//  Create a new item
exports.createItem = async (req, res) => {
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
    await Activity.create({
      description: `Created a new item: ${name}`,
      user: userId, // link to the actual user
    });

    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//  Get all items (optional filter)
exports.getAllItems = async (req, res) => {
  try {
    const { category, lat, lng, radius } = req.query;
    const items = await getAllItemsService({ category, lat, lng, radius });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  Get single item by ID
exports.getItemById = async (req, res) => {
  try {
    const item = await getItemByIdService(req.params.id);
    res.status(200).json(item);
  } catch (err) {
    res.status(404).json({ message: 'Item not found' });
  }
};

// Get items by user
exports.getItemsByUser = async (req, res) => {
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
exports.markItemSwapped = async (req, res) => {
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

exports.updateItem = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid item ID' });
  }

  let updateData = { ...req.body };

  // If coordinates are present, convert to GeoJSON format
  if (req.body.coordinates) {
    updateData.location = {
      type: 'Point',
      coordinates: req.body.coordinates, // [lng, lat]
    };
    delete updateData.coordinates; // remove raw coordinates from body
  }

  // Optionally handle image (if using multer)
  if (req.file?.filename) {
    updateData.image = req.file.filename;
  }

  const updatedItem = await updateItemService(id, updateData);

  if (!updatedItem) {
    return res.status(404).json({ message: 'Item not found' });
  }

  res.status(200).json(updatedItem);
});

// delete item by id

// exports.deleteItem = async (req, res) => {
//   try {
//     const itemId = req.params.id; // Item ID from URL
//     if (!itemId) {
//       return res.status(400).json({ message: 'Item ID is required' });
//     }
//     const item = await deleteItemService(itemId);
//     res.status(200).json({ message: 'Item deleted successfully', item });
//   } catch (err) {
//     res.status(404).json({ message: err.message });
//   }
// };

exports.deleteItem = async (req, res) => {
  console.log('🗑 DELETE /items/:id hit with ID:', req.params.id);
  console.log('🔐 Token found:', req.headers.authorization);

  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: 'Invalid item ID' });
    }

    const deletedItem = await Item.findByIdAndDelete(itemId);

    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res
      .status(200)
      .json({ message: 'Item deleted successfully', item: deletedItem });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
