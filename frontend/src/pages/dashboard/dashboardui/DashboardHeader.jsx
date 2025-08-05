import React from 'react';
import './DashboardHeader.css';

const DashboardHeader = () => {
  return (
    <header className="dashboard-header">
      <div className="dashboard-left">
        <div className="dashboard-logo">⚡ SwapMate Dashboard</div>
      </div>
      <div className="dashboard-right">
        <input
          type="text"
          placeholder="Search..."
          className="dashboard-search"
        />
        <div className="dashboard-avatar">
          <img src="/avatar.png" alt="User Avatar" />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
