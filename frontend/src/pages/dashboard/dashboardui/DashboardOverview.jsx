import React from 'react';
import './DashboardOverview.css';
import UserStatsCard from './components/UserStatsCard';
import RecentActivity from './components/RecentActivity';
import ProfileProgress from './components/ProfileProgress';
import QuickActions from './components/QuickActions';
import UserActivityHeatmap from './components/swapitem/UserActivityHeatmap';
import UserDashboardChart from './components/swapitem/UserDashboardChart';
import UpcomingEvents from './components/swapitem/UpcomingEvents';
import UserNotificationsPanel from '../notifications/UserNotificationsPanel';
import UserRequestsBarChart from './components/chart/UserRequestsBarChart';
import UserTransactionsLineChart from './components/chart/UserTransactionsLineChart';
import UserStatusPieChart from './components/chart/UserStatusPieChart';

const DashboardOverview = () => {
  return (
    <div className="dashboard-overview-container">
      <div className="dashboard-grid">
        <div className="grid-item">
          <UserStatsCard />
        </div>

        <div className="grid-item">
          <ProfileProgress />
        </div>

        <div className="grid-item">
          <QuickActions />
        </div>

        <div className="grid-item">
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
        <div className="grid-item">
          <UserRequestsBarChart />
        </div>
        <div className="grid-item">
          <UserTransactionsLineChart />
        </div>
        <div className="grid-item">
          <UserStatusPieChart />
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;


