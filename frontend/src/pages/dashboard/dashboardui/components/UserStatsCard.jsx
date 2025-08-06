// src/components/dashboard/UserStatsCard.jsx
import React from 'react';
import './UserStatsCard.css';

const UserStatsCard = () => {
  const stats = [
    { label: 'Items Listed', value: 18 },
    { label: 'Items Swapped', value: 12 },
    { label: 'Pending Requests', value: 3 },
  ];

  return (
    <div className="user-stats-card">
      <h2>Your Stats</h2>
      <ul className="user-stats-list">
        {stats.map((stat, index) => (
          <li key={index} className="user-stats-item">
            <span className="user-stats-label">{stat.label}</span>
            <span className="user-stats-value">{stat.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserStatsCard;
