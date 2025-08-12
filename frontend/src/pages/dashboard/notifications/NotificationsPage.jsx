import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import API from '../../../utils/api/axiosInstance';
import './NotificationsPage.css';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [searchParams] = useSearchParams();

  const fetchNotifications = async () => {
    try {
      const res = await API.get('/api/notifications');
      setNotifications(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteNotification = async (id) => {
    if (!window.confirm('Delete this notification?')) return;
    try {
      await API.delete(`/api/notifications/${id}`);
      setNotifications((prev) => prev.filter((n) => n._id !== id));
      if (selectedNotification?._id === id) {
        setSelectedNotification(null);
      }
    } catch (err) {
      console.error('Error deleting notification:', err);
    }
  };

  const markAsRead = async (id) => {
    try {
      await API.put(`/api/notifications/${id}`);
      setNotifications((prev) =>
        prev.map((n) =>
          n._id === id ? { ...n, isRead: true, isSeen: true } : n
        )
      );
    } catch (err) {
      console.error('Error marking as read:', err);
    }
  };

  const openNotification = (notification) => {
    setSelectedNotification(notification);
    if (!notification.isRead) markAsRead(notification._id);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    const idFromUrl = searchParams.get('id');
    if (idFromUrl && notifications.length > 0) {
      const found = notifications.find((n) => n._id === idFromUrl);
      if (found) openNotification(found);
    }
  }, [searchParams, notifications]);

  return (
    <div className="notifications-page">
      <h2>My Notifications</h2>

      {loading ? (
        <p>Loading notifications...</p>
      ) : notifications.length === 0 ? (
        <p>No notifications available.</p>
      ) : (
        <table className="notifications-table">
          <thead>
            <tr>
              <th>Message</th>
              <th>Type</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((note) => (
              <tr
                key={note._id}
                className={note.isRead ? 'read' : 'unread'}
              >
                <td>{note.message}</td>
                <td>{note.type}</td>
                <td>{new Date(note.createdAt).toLocaleString()}</td>
                <td>
                  <button
                    className="btn view"
                    onClick={() => openNotification(note)}
                  >
                    View
                  </button>
                  <button
                    className="btn delete"
                    onClick={() => deleteNotification(note._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedNotification && (
        <div className="modal-backdrop" onClick={() => setSelectedNotification(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Notification Details</h3>
            <p><strong>Message:</strong> {selectedNotification.message}</p>
            <p><strong>Type:</strong> {selectedNotification.type}</p>
            <p><strong>Date:</strong> {new Date(selectedNotification.createdAt).toLocaleString()}</p>

            {/* {selectedNotification.actionURL && (
              <p>
                <a
                  href={selectedNotification.actionURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn link"
                >
                  Go to Link
                </a>
              </p>
            )} */}

            <button
              className="btn close"
              onClick={() => setSelectedNotification(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
