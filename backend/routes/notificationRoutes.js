const express = require('express');
const router = express.Router();

const {
  createNotification,
  getNotifications,
  getUnreadCount,
  markNotificationAsRead,
  getNotificationsByReceiver,
  deleteNotification,
} = require('../controllers/notificationController');

const { protect } = require('../middleware/authMiddleware');

// ------------------------------------------------------------
// @route   POST /api/notifications
// @desc    Create a new notification
// @access  Private
// ------------------------------------------------------------
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

// ------------------------------------------------------------
// @route   GET /api/notifications
// @desc    Get all notifications for logged-in user
// @access  Private
// ------------------------------------------------------------
router.get('/', protect, getNotifications);

// ------------------------------------------------------------
// @route   GET /api/notifications/receiver/:receiverId
// @desc    Get notifications for a specific receiver
// @access  Private
// ------------------------------------------------------------
router.get('/receiver/:receiverId', protect, getNotificationsByReceiver);

// ------------------------------------------------------------
// @route   GET /api/notifications/unread-count
// @desc    Get unread notification count for logged-in user
// @access  Private
// ------------------------------------------------------------
router.get('/unread-count', protect, getUnreadCount);

// ------------------------------------------------------------
// @route   PUT /api/notifications/:id
// @desc    Mark a notification as read
// @access  Private
// ------------------------------------------------------------
router.put('/:id', protect, markNotificationAsRead);

// ------------------------------------------------------------
// @route   DELETE /api/notifications/:id
// @desc    Delete a notification (soft delete)
// @access  Private
// ------------------------------------------------------------
router.delete('/:id', protect, deleteNotification);

module.exports = router;
