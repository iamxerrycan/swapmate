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
