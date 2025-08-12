import React, { useEffect, useState } from 'react';
import './UserNotificationsPanel.css';
import API from '../../../utils/api/axiosInstance';
import { useNavigate } from 'react-router-dom';

export default function UserNotificationsPanel() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await API.get('/api/notifications'); // Protected by token
        setNotifications(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error('Error fetching notifications:', err);
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const goToNotificationsPage = () => {
    navigate('/dashboard/notifications');
  };

  return (
    <div className="notifications-panel">
      <h3>Notifications</h3>

      {loading ? (
        <p>Loading notifications...</p>
      ) : notifications.length === 0 ? (
        <p>No notifications available.</p>
      ) : (
        <ul>
          {notifications.map((note) => (
            <li
              key={note._id}
              className={`notification ${note.isSeen ? 'seen' : 'unseen'}`}
            >
              <div
                className="note-message"
                onClick={goToNotificationsPage}
                style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
              >
                {note.message}
              </div>
              <div className="note-time">
                {new Date(note.createdAt).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
