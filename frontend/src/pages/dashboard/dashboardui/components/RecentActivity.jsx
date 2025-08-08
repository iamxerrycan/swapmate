import React, { useEffect, useState } from 'react';
import { Clock, Activity } from 'lucide-react';
import API from '../../../../utils/api/axiosInstance';
import './RecentActivity.css';

const RecentActivity = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    API.get('/api/activities')
      .then((res) => setActivities(res.data))
      .catch((err) => console.error('Error fetching activities:', err));
  }, []);

  return (
    <div className="recent-activity-container">
      <h2 className="recent-activity-title">
        <Activity size={18} /> Recent Activity
      </h2>
      <ul className="recent-activity-list">
        {activities.map((activity) => (
          <li key={activity._id} className="recent-activity-item">
            <span className="recent-activity-description">
              {activity.user?.name ? `${activity.user.name} ` : ''}
              {activity.description}
            </span>
            <span className="recent-activity-time">
              <Clock size={12} />{' '}
              {new Date(activity.createdAt).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity;
