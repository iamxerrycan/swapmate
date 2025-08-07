import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserNotificationsPanel.css';

export default function UserNotificationsPanel() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get('/api/notifications');
        // Make sure res.data is an array
        setNotifications(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error('Error fetching notifications:', err);
        setNotifications([]);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="notifications-panel">
      <h3>Notifications</h3>
      <ul>
        {notifications.map((note) => (
          <li key={note._id}>
            <div className="note-message">{note.message}</div>
            <div className="note-time">{new Date(note.createdAt).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
