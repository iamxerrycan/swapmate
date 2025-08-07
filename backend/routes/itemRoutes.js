const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  deleteItem,
  createItem,
  updateItem,
  getAllItems,
  getItemById,
  getItemsByUser,
  markItemSwapped,
} = require('../controllers/itemController');

//  POST: Create new item (Protected)
router.post('/', protect, createItem);

//  GET: All items with optional filter (Public)
router.get('/', getAllItems);


// GET: All items by logged-in user (Protected)
router.get('/user/items', protect, getItemsByUser); 

//  GET: Single item by ID (Public)
router.get('/:id', getItemById);

router.put('/:id/swap',protect , markItemSwapped);

//  PUT: Update item by ID (Protected)
router.put('/:id',protect, updateItem);

// DELETE: Delete item by ID (Protected)
router.delete('/:id',protect, deleteItem);


module.exports = router;




// | Method   | Route                   | Purpose                         | Body (if required)  |
// | -------- | ----------------------- | ------------------------------- | ------------------- |
// | `POST`   | `/api/items`            | Create new item (user only)     | ✅ Yes *(see below)* |
// | `GET`    | `/api/items`            | Get all items (with filters)    | ❌ No                |
// | `GET`    | `/api/items/user/items` | Get all items of logged-in user | ❌ No                |
// | `GET`    | `/api/items/:id`        | Get single item by ID           | ❌ No                |
// | `PUT`    | `/api/items/:id`        | Update item                     | ✅ Yes *(see below)* |
// | `PUT`    | `/api/items/:id/swap`   | Mark item as swapped            | ❌ No                |
// | `DELETE` | `/api/items/:id`        | Delete item                     | ❌ No                |


// {
//   "name": "Wooden Chair",
//   "description": "A strong wooden chair in good condition",
//   "category": "furniture",
//   "condition": "used",
//   "location": "Kolkata",
//   "image": "https://yourcdn.com/image.jpg"
// }
