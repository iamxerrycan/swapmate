const {
  createNotificationService,
  getNotificationsService,
  getUnreadCountService,
  markAsReadService,
  getNotificationsByReceiverService,
  deleteNotificationService,
} = require("../services/notificationService");

// @desc    Create a new notification
const createNotification = async (req, res) => {
  try {
    const { receiver, message, type, relatedItem, relatedSwap, actionURL } = req.body;
    const sender = req.user?._id;

    if (!sender) {
      return res.status(401).json({ message: "Sender (logged-in user) is missing or unauthorized" });
    }

    const newNotification = await createNotificationService({
      sender,
      receiver,
      message,
      type,
      relatedItem: relatedItem || null,
      relatedSwap,
      actionURL,
    });

    res.status(201).json(newNotification);
  } catch (error) {
    console.error("❌ Notification creation failed:", error);
    res.status(400).json({ message: error.message || "Internal server error" });
  }
};

// @desc    Get all notifications for logged-in user
const getNotifications = async (req, res) => {
  try {
    const notifications = await getNotificationsService(req.user._id);
    res.status(200).json(notifications);
  } catch (error) {
    res.status(400).json({ message: error.message || "Failed to fetch notifications" });
  }
};

// @desc    Get unread notification count
const getUnreadCount = async (req, res) => {
  try {
    const count = await getUnreadCountService(req.user._id);
    res.status(200).json({ unreadCount: count });
  } catch (error) {
    res.status(400).json({ message: error.message || "Failed to get unread count" });
  }
};

// @desc    Mark a notification as read
const markNotificationAsRead = async (req, res) => {
  try {
    const notification = await markAsReadService(req.params.id, req.user._id);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.status(200).json(notification);
  } catch (error) {
    res.status(400).json({ message: error.message || "Failed to mark notification as read" });
  }
};

// @desc    Get notifications by receiver
const getNotificationsByReceiver = async (req, res) => {
  try {
    const notifications = await getNotificationsByReceiverService(req.user._id);
    res.status(200).json(notifications);
  } catch (error) {
    res.status(400).json({ message: error.message || "Failed to fetch notifications" });
  }
};

// @desc    Delete a notification
const deleteNotification = async (req, res) => {
  try {
    const notification = await deleteNotificationService(req.params.id, req.user._id);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.status(200).json({ message: "Notification deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message || "Failed to delete notification" });
  }
};

module.exports = {
  createNotification,
  getNotifications,
  getUnreadCount,
  markNotificationAsRead,
  deleteNotification,
  getNotificationsByReceiver,
};
