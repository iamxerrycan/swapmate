import React from 'react';
import './DashboardOverview.css'; // ✅ Import the separate CSS file
import UserStatsCard from './components/UserStatsCard';
import RecentActivity from './components/RecentActivity';
import ProfileProgress from './components/ProfileProgress';
import QuickActions from './components/QuickActions';

const DashboardOverview = () => {
  return (
    <div className="dashboard-overview">
      <UserStatsCard />
      <ProfileProgress />
      <QuickActions />
      <RecentActivity />
    </div>
  );
};

export default DashboardOverview;
