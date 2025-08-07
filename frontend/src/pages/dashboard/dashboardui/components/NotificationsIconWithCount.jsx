// src/components/NotificationsIconWithCount.jsx
import React, { useState } from 'react';
import useNotifications from '../../../../hooks/useNotifications';
import UserNotificationsPanel from './swapitem/UserNotificationsPanel';
import './NotificationsIconWithCount.css';

const NotificationsIconWithCount = () => {
  const { unreadCount } = useNotifications();
  const [showPanel, setShowPanel] = useState(false);

  return (
    <div className="notifications-icon-container">
      <button onClick={() => setShowPanel((prev) => !prev)}>
        🔔
        {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
      </button>
      {showPanel && <UserNotificationsPanel />}
    </div>
  );
};

export default NotificationsIconWithCount;
