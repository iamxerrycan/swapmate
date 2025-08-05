// src/pages/dashboard/DashboardLayout.jsx
import { Outlet } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';
import './DashboardLayout.css';

export default function DashboardLayout() {
  return (
    <div className="dashboard-container">
      <DashboardSidebar />
      <div className="dashboard-main">
        <DashboardHeader />
        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
