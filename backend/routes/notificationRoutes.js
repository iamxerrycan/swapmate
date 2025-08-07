const express = require('express');
const router = express.Router();

const {
  createNotification,
  getNotifications,
  getUnreadCount,
  markNotificationAsRead,
  deleteNotification,
} = require('../controllers/notificationController');

const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/notifications
// @desc    Create a new notification
// @access  Private
router.post(
  '/',
  protect,
  (req, res, next) => {
    console.log('🔥 Incoming POST /api/notifications');
    console.log('📦 Body:', req.body);
    next();
  },
  createNotification
);


// @route   GET /api/notifications
// @desc    Get all notifications for logged-in user
// @access  Private
router.get('/', protect, getNotifications);

// @route   GET /api/notifications/unread-count
// @desc    Get unread notification count for logged-in user
// @access  Private
router.get('/unread-count', protect, getUnreadCount);

// @route   PUT /api/notifications/:id
// @desc    Mark a notification as read
// @access  Private
router.put('/:id', protect, markNotificationAsRead);

// @route   DELETE /api/notifications/:id
// @desc    Delete a notification
// @access  Private
router.delete('/:id', protect, deleteNotification);

module.exports = router;

// | Method   | Route                             | Purpose                    | Body (if required)  |
// | -------- | --------------------------------- | -------------------------- | ------------------- |
// | `POST`   | `/api/notifications`              | Create notification        | ✅ Yes *(see below)* |
// | `GET`    | `/api/notifications`              | Get all notifications      | ❌ No                |
// | `GET`    | `/api/notifications/unread-count` | Get unread count           | ❌ No                |
// | `PUT`    | `/api/notifications/:id`          | Mark as read               | ❌ No                |
// | `DELETE` | `/api/notifications/:id`          | Delete (soft) notification | ❌ No                |

// for post method body
// {
//   "receiver": "USER_ID",
//   "message": "Swap request received",
//   "type": "swap",
//   "relatedItem": "ITEM_ID",
//   "relatedSwap": "SWAP_ID",
//   "actionURL": "/swap/123"
// }
