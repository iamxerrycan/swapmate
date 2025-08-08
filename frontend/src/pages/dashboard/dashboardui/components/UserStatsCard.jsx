// src/components/dashboard/UserStatsCard.jsx
import React, { useEffect, useState } from 'react';
import './UserStatsCard.css';
import API from '../../../../utils/api/axiosInstance';

const UserStatsCard = () => {
  const [stats, setStats] = useState({
    listed: 0,
    swapped: 0,
    pending: 0,
    rejected: 0,
    accepted: 0,
    fulfilled: 0,
    cancelled: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get('/api/user/stats');
        console.log('Fetched Stats:', res.data);
        setStats(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load stats:', err);
        setError('Could not fetch stats');
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div className="user-stats-card">Loading stats...</div>;
  if (error) return <div className="user-stats-card error">{error}</div>;

  return (
    <div className="user-stats-card">
      <h2>Your Stats</h2>
      <ul className="user-stats-list">
        <li className="user-stats-item">
          <span className="user-stats-label">Items Listed</span>
          <span className="user-stats-value">{stats.listed}</span>
        </li>
        <li className="user-stats-item">
          <span className="user-stats-label">Items Swapped</span>
          <span className="user-stats-value">{stats.swapped}</span>
        </li>
        <li className="user-stats-item">
          <span className="user-stats-label">Pending Requests</span>
          <span className="user-stats-value">{stats.pending}</span>
        </li>
        <li className="user-stats-item">
          <span className="user-stats-label">Rejected Requests</span>
          <span className="user-stats-value">{stats.rejected}</span>
        </li>
        <li className="user-stats-item">
          <span className="user-stats-label">Accepted Requests</span>
          <span className="user-stats-value">{stats.accepted}</span>
        </li>
        <li className="user-stats-item">
          <span className="user-stats-label">Fulfilled Requests</span>
          <span className="user-stats-value">{stats.fulfilled}</span>
        </li>
        <li className="user-stats-item">
          <span className="user-stats-label">Cancelled Requests</span>
          <span className="user-stats-value">{stats.cancelled}</span>
        </li>
      </ul>
    </div>
  );
};

export default UserStatsCard;
