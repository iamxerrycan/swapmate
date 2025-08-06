import React from 'react';
import './DashboardOverview.css';
import UserStatsCard from './components/UserStatsCard';
import RecentActivity from './components/RecentActivity';
import ProfileProgress from './components/ProfileProgress';
import QuickActions from './components/QuickActions';
import UserActivityHeatmap from './components/swapitem/UserActivityHeatmap';
import UserDashboardChart from './components/swapitem/UserDashboardChart';
import UpcomingEvents from './components/swapitem/UpcomingEvents';
import UserNotificationsPanel from './components/swapitem/UserNotificationsPanel';

const DashboardOverview = () => {
  return (
    <div className="dashboard-overview-container">
      <div className="dashboard-grid">
  <div className="grid-item full-width">
    <UserStatsCard />
  </div>

  <div className="grid-item">
    <ProfileProgress />
  </div>

  <div className="grid-item">
    <QuickActions />
  </div>

  <div className="grid-item full-width">
    <RecentActivity />
  </div>

  <div className="grid-item">
    <UserDashboardChart />
  </div>

  <div className="grid-item">
    <UserNotificationsPanel />
  </div>

  <div className="grid-item">
    <UpcomingEvents />
  </div>

  <div className="grid-item">
    <UserActivityHeatmap />
  </div>
</div>

    </div>
  );
};

export default DashboardOverview;
