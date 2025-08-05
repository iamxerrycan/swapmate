import React from 'react';
import AnalyticsCard from './components/AnalyticsCard';
import ActivityCard from './components/ActivityCard';
import UserStatsChart from './components/UserStatsChart';
import ItemCategoryChart from './components/ItemCategoryChart';
import SwapStatsBarChart from './components/SwapStatsBarChart';



import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard-container">
      <h2 className="dashboard-title">Welcome Admin 👑</h2>

      <div className="dashboard-cards">
        <AnalyticsCard title="Total Users" value="1,245" icon="👥" />
        <AnalyticsCard title="Items Listed" value="3,402" icon="📦" />
        <AnalyticsCard title="Swaps Completed" value="1,078" icon="🔁" />
        <AnalyticsCard title="Active Sessions" value="89" icon="🟢" />
      </div>

      <div className="dashboard-charts">
        <UserStatsChart />
      </div>

      <div className="dashboard-activity">
        <ActivityCard
          title="Latest Swaps"
          activities={[
            'User Raj swapped a book with Amit.',
            'Priya listed a new electronic item.',
            'Admin updated item categories.',
          ]}
        />
      </div>
      <div className="dashboard-charts">
        <ItemCategoryChart />
      </div>
      <div className="dashboard-charts">
        <SwapStatsBarChart />
      </div>
    </div>
  );
};

export default AdminDashboard;
