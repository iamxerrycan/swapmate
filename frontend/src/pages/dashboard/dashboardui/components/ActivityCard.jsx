// dashboardui/components/AnalyticsCard.jsx
import React from 'react';
import './AnalyticsCard.css';

const AnalyticsCard = ({ icon, title, value, change }) => {
  return (
    <div className="analytics-card">
      <div className="analytics-header">
        <span className="analytics-icon">{icon}</span>
        <span className="analytics-title">{title}</span>
      </div>
      <div className="analytics-value">{value}</div>
      <div className={`analytics-change ${change >= 0 ? 'positive' : 'negative'}`}> 
        {change >= 0 ? '+' : ''}{change}%
      </div>
    </div>
  );
};

export default AnalyticsCard;

