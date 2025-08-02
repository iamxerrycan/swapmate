const Item = require('../models/itemModel');


//  Create a new item
const createItemService = async ({ name, category, description, image, location, address, userId }) => {
  const item = await Item.create({
    name,
    category,
    description,
    image,
    location: {
      type: 'Point',
      coordinates: location, // [longitude, latitude]
    },
    address,
    user: userId,
  });
  return item;
};

//  Get all items (optionally filter by category or proximity)
const getAllItemsService = async ({ category, lat, lng, radius = 1000 }) => {
  let query = {};

  if (category) {
    query.category = category;
  }

  if (lat && lng) {
    query.location = {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [lng, lat],
        },
        $maxDistance: radius, // meters
      },
    };
  }

  const items = await Item.find(query).populate('user', 'name email');
  return items;
};

//  Get single item by ID
const getItemByIdService = async (itemId) => {
  return await Item.findById(itemId).populate('user', 'name email');
};

//  Get items posted by a specific user
const getItemsByUserService = async (userId) => {
  console.log("Querying items for user:", userId);

  return await Item.find({ user: userId });
};



//  Mark an item as swapped
const markItemSwappedservice = async (itemId, swappedWithUserId) => {
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
  return updatedItem;
};

const updateItemService = async (itemId, updatedData) => {
  console.log("Updating item ID:", itemId);
  return await Item.findByIdAndUpdate(itemId, updatedData, { new: true });
};


module.exports = {
  updateItemService,
  createItemService,
  getAllItemsService,
  getItemByIdService,
  getItemsByUserService,
  markItemSwappedservice
};
