// routes/swapRoute.js

const express = require('express');
const router = express.Router();
const {
  createSwapRequest,
  getAllSwaps,
  getUserSwapRequests,
  getSwapById,
  acceptSwap,
  rejectSwap,
  cancelSwap,
  deleteSwap,
  completeSwap,
  markSwapped,
} = require('../controllers/swapController');

const { protect } = require('../middleware/authMiddleware');

// Create a swap request
router.post(
  '/sendrequest',
  (req, res, next) => {
    // console.log('🔥 Incoming swap request');
    next();
  },
  createSwapRequest
);

// Get all swaps (admin or for dashboard)
router.get('/swaps', protect, getAllSwaps);

// Get current user's swaps
router.get('/my', protect, getUserSwapRequests);

// Get specific swap by ID
router.get('/:id', protect, getSwapById);

// Accept a swap
router.put('/:id/accept', protect, acceptSwap);

// Reject a swap
router.put('/:id/reject', protect, rejectSwap);

// Cancel a swap (by sender)
router.put('/:id/cancel', protect, cancelSwap);

// Delete a swap
router.delete('/:id', protect, deleteSwap);

// Complete a swap
router.put('/:id/complete', protect, completeSwap);

// Mark a swap as swapped
router.put('/:id/swapped', protect, markSwapped);


module.exports = router;

// | Method   | Route                    | Purpose                         | Body (if required)  |
// | -------- | ------------------------ | ------------------------------- | ------------------- |
// | `POST`   | `/api/swaps/sendrequest` | Send a swap request             | ✅ Yes *(see below)* |
// | `GET`    | `/api/swaps/swaps`       | Get all swaps (admin/dashboard) | ❌ No                |
// | `GET`    | `/api/swaps/my`          | Get user's swap requests        | ❌ No                |
// | `GET`    | `/api/swaps/:id`         | Get swap by ID                  | ❌ No                |
// | `PUT`    | `/api/swaps/:id/accept`  | Accept swap                     | ❌ No                |
// | `PUT`    | `/api/swaps/:id/reject`  | Reject swap                     | ❌ No                |
// | `PUT`    | `/api/swaps/:id/cancel`  | Cancel swap                     | ❌ No                |
// | `DELETE` | `/api/swaps/:id`         | Delete swap                     | ❌ No                |

// {
//   "fromUser": "USER_ID_1",
//   "toUser": "USER_ID_2",
//   "fromItem": "ITEM_ID_1",
//   "toItem": "ITEM_ID_2",
//   "status": "Pending",
//   "message": "Swap request message"
// }
