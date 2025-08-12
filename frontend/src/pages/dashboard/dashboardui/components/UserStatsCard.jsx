import React from 'react';
import './UserStatsCard.css';
import useUserStats from '../../../../hooks/UseUserStats';
import Loader from '../../../../components/ui/Loader';

const UserStatsCard = () => {
  const { stats, loading, error } = useUserStats();

  if (loading) return <div className="user-stats-card"><Loader fullHeight={true} /></div>;
  if (error) return <div className="user-stats-card error">{error}</div>;

  return (
    <div className="user-stats-card">
      <h2>Your Stats</h2>
      <ul className="user-stats-list">
        {Object.entries(stats).map(([key, value]) => (
          <li className="user-stats-item" key={key}>
            <span className="user-stats-label">
              {key.replace(/^\w/, (c) => c.toUpperCase())}
            </span>
            <span className="user-stats-value">{value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserStatsCard;
