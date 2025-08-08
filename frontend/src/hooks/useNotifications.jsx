// src/hooks/useNotifications.js
import { useEffect, useState } from 'react';
import API from '../utils/api/axiosInstance';

const useNotifications = (userId) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const { data } = await API.get(`/api/notifications/${userId}`);
      setNotifications(data);
    } catch (err) {
      console.error('❌ Error fetching notifications', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUnreadCount = async () => {
    if (!userId) return;
    try {
      const { data } = await API.get(`/api/notifications/unread-count/${userId}`);
      setUnreadCount(data.count);
    } catch (err) {
      console.error('❌ Error fetching unread count', err);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      await API.put(`/api/notifications/${notificationId}/read`);
      await fetchNotifications();
      await fetchUnreadCount();
    } catch (err) {
      console.error('❌ Error marking as read', err);
    }
  };

  const deleteNotification = async (notificationId) => {
    try {
      await API.delete(`/api/notifications/${notificationId}`);
      await fetchNotifications();
      await fetchUnreadCount();
    } catch (err) {
      console.error('❌ Error deleting notification', err);
    }
  };

  const createNotification = async (payload) => {
    try {
      console.log('📤 Sending notification:', payload);
      await API.post('/api/notifications', payload);
      await fetchNotifications();
      await fetchUnreadCount();
    } catch (err) {
      console.error('❌ Error creating notification', err);
    }
  };

  useEffect(() => {
    fetchNotifications();
    fetchUnreadCount();
  }, [userId]);

  return {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    deleteNotification,
    createNotification,
    refresh: () => {
      fetchNotifications();
      fetchUnreadCount();
    },
  };
};

export default useNotifications;
