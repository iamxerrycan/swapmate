const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
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
 console.log("PUT /api/items/:id hit ✅");

module.exports = router;
