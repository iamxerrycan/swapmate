// src/pages/dashboard/DashboardLayout.jsx
import { Outlet } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar'
import './DashboardLayout.css';

export default function DashboardLayout() {
  return (
    <div className="dashboard-container">
      <DashboardSidebar />
      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  );
}
