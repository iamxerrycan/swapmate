import React from 'react';
import './UserNotificationsPanel.css';

const dummyNotifications = [
  { id: 1, message: 'Your item swap request was approved', time: '2 mins ago' },
  { id: 2, message: 'Profile updated successfully', time: '1 hour ago' },
  { id: 3, message: 'New swap offer received', time: 'Yesterday' },
];

export default function UserNotificationsPanel() {
  return (
    <div className="notifications-panel">
      <h3>Notifications</h3>
      <ul>
        {dummyNotifications.map((note) => (
          <li key={note.id}>
            <div className="note-message">{note.message}</div>
            <div className="note-time">{note.time}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
