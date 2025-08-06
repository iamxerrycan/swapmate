import React from 'react';
import { Clock, Activity } from 'lucide-react';
import './RecentActivity.css'; // 🔗 Import the CSS

const activities = [
  { id: 1, description: 'User Rajshish uploaded a document', time: '2h ago' },
  { id: 2, description: 'Sonam booked an appointment', time: '4h ago' },
  { id: 3, description: 'Admin approved a profile', time: '1 day ago' },
  { id: 4, description: 'New user registered', time: '2 days ago' },
];

const RecentActivity = () => {
  return (
    <div className="recent-activity-container">
      <h2 className="recent-activity-title">
        <Activity size={18} /> Recent Activity
      </h2>
      <ul className="recent-activity-list">
        {activities.map((activity) => (
          <li key={activity.id} className="recent-activity-item">
            <span className="recent-activity-description">
              {activity.description}
            </span>
            <span className="recent-activity-time">
              <Clock size={12} /> {activity.time}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity;
