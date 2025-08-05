// src/pages/dashboardui/DashboardHeader.jsx
import React from 'react';
import './DashboardHeader.css';

const DashboardHeader = () => {
  return (
    <header className="dashboard-header">
      <div className="dashboard-logo">⚡ SwapMate Dashboard</div>
      <div className="dashboard-avatar">
        <img src="/avatar.png" alt="User Avatar" />
      </div>
    </header>
  );
};

export default DashboardHeader;
