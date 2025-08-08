const mongoose = require("mongoose");
const Notification = require("../models/notificationModel");

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
  if (!mongoose.Types.ObjectId.isValid(sender) || !mongoose.Types.ObjectId.isValid(receiver)) {
    throw new Error("Invalid sender or receiver ID");
  }

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

// Get notifications for a specific receiver (with populate)
const getNotificationsByReceiverService = async (userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid user ID");
  }

  return await Notification.find({ receiver: userId, isDeleted: false })
    .sort({ createdAt: -1 })
    .populate("sender", "name")
    .populate("relatedItem")
    .populate("relatedSwap")
    .lean();
};

// Get all notifications for a user
const getNotificationsService = async (userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid user ID");
  }

  return await Notification.find({ receiver: userId, isDeleted: false })
    .sort({ createdAt: -1 })
    .lean();
};

// Get unread notification count
const getUnreadCountService = async (userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid user ID");
  }

  return await Notification.countDocuments({
    receiver: userId,
    isRead: false,
    isDeleted: false,
  });
};

// Mark a notification as read
const markAsReadService = async (notificationId, userId) => {
  if (!mongoose.Types.ObjectId.isValid(notificationId) || !mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid ID");
  }

  return await Notification.findOneAndUpdate(
    { _id: notificationId, receiver: userId },
    { isRead: true, isSeen: true },
    { new: true }
  );
};

// Soft delete a notification
const deleteNotificationService = async (notificationId, userId) => {
  if (!mongoose.Types.ObjectId.isValid(notificationId) || !mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid ID");
  }

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
  getNotificationsByReceiverService,
};
