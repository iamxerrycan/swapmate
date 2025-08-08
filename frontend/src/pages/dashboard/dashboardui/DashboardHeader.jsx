import React from 'react';
import './DashboardHeader.css';
import { FaUser, FaUserCircle } from 'react-icons/fa';

const DashboardHeader = () => {
  return (
    <header className="dashboard-header">
      <div className="dashboard-left">
        {/* <div className="dashboard-logo">⚡ SwapMate Dashboard</div> */}
      </div>
      <div className="dashboard-right">
        <input
          type="text"
          placeholder="Search..."
          className="dashboard-search"
        />
        <div className="dashboard-avatar">
          {/* <img src="/avatar.png" alt="User Avatar" /> */}
          <FaUserCircle className="profile-icon-dashboard" />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
