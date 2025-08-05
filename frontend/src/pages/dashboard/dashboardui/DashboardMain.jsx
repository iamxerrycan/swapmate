//src/pages/dashboard/dashboardui/DashboardMain.jsx
// src/pages/dashboardui/DashboardMain.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';
import DashboardHeader from './DashboardHeader';
import './DashboardMain.css';

const DashboardMain = () => {
  const user = useSelector((state) => state.auth.user);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="dashboardmain-container">
      <DashboardHeader />
      <div className="dashboard-content">
        {user.isAdmin ? <AdminDashboard /> : <UserDashboard />}
      </div>
    </div>
  );
};

export default DashboardMain;
