// src/pages/dashboardui/UserDashboard.jsx
import React from 'react';
import './UserDashboard.css';
import DashboardOverview from './DashboardOverview';
import DashboardHeader from './DashboardHeader';

const UserDashboard = () => {
  return (
    <div className="user-dashboard">
      {/* <DashboardHeader/>   */}
      <h1 className="dashboard-title">Welcome to Your Dashboard</h1>
      <div className="dashboard-section">
        <DashboardOverview/>
        </div>
    </div>
  );
};

export default UserDashboard;
