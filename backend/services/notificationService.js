//services/notificationService.js


const Notification = require('../models/notificationModel')

// Create a new notification
const createNotificationService = async ({
  sender,
  receiver,
  message,
  type,
  relatedItem,
  relatedSwap,
  actionURL,
}) => {
  return await Notification.create({
    sender,
    receiver,
    message,
    type,
    relatedItem,
    relatedSwap,
    actionURL,
  });
};

// Get all notifications for a user
const getNotificationsService = async (userId) => {
  return await Notification.find({ receiver: userId, isDeleted: false }).sort({
    createdAt: -1,
  });
};

// Get unread notification count
const getUnreadCountService = async (userId) => {
  return await Notification.countDocuments({
    receiver: userId,
    isRead: false,
    isDeleted: false,
  });
};

// Mark a notification as read
const markAsReadService = async (notificationId, userId) => {
  return await Notification.findOneAndUpdate(
    { _id: notificationId, receiver: userId },
    { isRead: true, isSeen: true },
    { new: true }
  );
};

// Soft delete a notification
const deleteNotificationService = async (notificationId, userId) => {
  return await Notification.findOneAndUpdate(
    { _id: notificationId, receiver: userId },
    { isDeleted: true },
    { new: true }
  );
};

module.exports = {
  createNotificationService,
  getNotificationsService,
  getUnreadCountService,
  markAsReadService,
  deleteNotificationService,
};
