const Item = require('../models/itemModel');

const createItemService = async ({
  name,
  category,
  description,
  image,
  location,
  address,
  userId,
}) => {
  try {
    const item = await Item.create({
      name,
      category,
      description,
      image,
      location: {
        type: 'Point',
        coordinates: location,
      },
      address,
      user: userId,
    });
    return item;
  } catch (error) {
    throw new Error(error.message || 'Failed to create item');
  }
};

const getAllItemsService = async ({ category, lat, lng, radius = 1000 }) => {
  try {
    let query = {};
    if (category) query.category = category;

    if (lat && lng) {
      query.location = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [lng, lat],
          },
          $maxDistance: radius,
        },
      };
    }

    const items = await Item.find(query).populate('user', 'name email');
    return items;
  } catch (error) {
    throw new Error(error.message || 'Failed to get items');
  }
};

const getItemByIdService = async (itemId) => {
  try {
    const item = await Item.findById(itemId).populate('user', 'name email');
    if (!item) throw new Error('Item not found');
    return item;
  } catch (error) {
    throw new Error(error.message || 'Failed to get item by ID');
  }
};

const getItemsByUserService = async (userId) => {
  try {
    return await Item.find({ user: userId });
  } catch (error) {
    throw new Error(error.message || 'Failed to get user items');
  }
};

const updateItemService = async (itemId, updatedData) => {
  try {
    const item = await Item.findByIdAndUpdate(itemId, updatedData, { new: true });
    if (!item) throw new Error('Item not found or update failed');
    return item;
  } catch (error) {
    throw new Error(error.message || 'Failed to update item');
  }
};

const deleteItemService = async (itemId) => {
  try {
    const item = await Item.findByIdAndDelete(itemId);
    if (!item) throw new Error('Item not found');
    return item;
  } catch (error) {
    throw new Error(error.message || 'Failed to delete item');
  }
};

const markItemSwappedservice = async (itemId, swappedWithUserId) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      itemId,
      {
        isSwapped: true,
        swappedWith: swappedWithUserId,
        swapDate: new Date(),
        swapStatus: 'Completed',
      },
      { new: true }
    );
    if (!updatedItem) throw new Error('Item not found or swap failed');
    return updatedItem;
  } catch (error) {
    throw new Error(error.message || 'Failed to mark item as swapped');
  }
};

const markItemSwappedService = markItemSwappedservice;

module.exports = {
  markItemSwappedService,
  deleteItemService,
  updateItemService,
  createItemService,
  getAllItemsService,
  getItemByIdService,
  getItemsByUserService,
  markItemSwappedservice,
};
