// dashboardui/components/AnalyticsCard.jsx
import React from 'react';
import './AnalyticsCard.css';

const AnalyticsCard = ({ title, value, icon }) => {
  return (
    <div className="analytics-card">
      <div className="analytics-icon">{icon}</div>
      <div className="analytics-content">
        <h4 className="analytics-title">{title}</h4>
        <p className="analytics-value">{value}</p>
      </div>
    </div>
  );
};

export default AnalyticsCard;
