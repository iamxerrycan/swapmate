// src/hooks/useNotifications.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import API from '../utils/api/axiosInstance';
const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/notifications');
      setNotifications(data);
    } catch (err) {
      console.error('Error fetching notifications', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUnreadCount = async () => {
    try {
      const { data } = await axios.get('/api/notifications/unread-count');
      setUnreadCount(data.count);
    } catch (err) {
      console.error('Error fetching unread count', err);
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.put(`/api/notifications/${id}`);
      await fetchNotifications();
      await fetchUnreadCount();
    } catch (err) {
      console.error('Error marking as read', err);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await axios.delete(`/api/notifications/${id}`);
      await fetchNotifications();
      await fetchUnreadCount();
    } catch (err) {
      console.error('Error deleting notification', err);
    }
  };

  const creatNotification = async (data) => {
    try {
       console.log('📤 Sending notification:', data);
      await API.post('/api/notifications', data);
      await fetchNotifications();
      await fetchUnreadCount();
    } catch (err) {
      console.error('Error creating notification', err);
    }
  };

  useEffect(() => {
    fetchNotifications();
    fetchUnreadCount();
  }, []);

  return {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    deleteNotification,
    creatNotification,
    refresh: () => {
      fetchNotifications();
      fetchUnreadCount();
    },
  };
};

export default useNotifications;
