// src/components/dashboard/charts/UserStatusPieChart.jsx
import React from 'react';
import useUserStats from '../../../../../hooks/UseUserStats';
import PieChart from './PieChart';
import Loader from '../../../../../components/ui/Loader';

const UserStatusPieChart = () => {
  const { stats, loading, error } = useUserStats();

  if (loading) return <div className="chart-container">{<Loader fullHeight={true} />}</div>;
  if (error) return <div className="chart-container error">{error}</div>;

  return (
    <div className="chart-container">
      <PieChart stats={stats} />
    </div>
  );
};

export default UserStatusPieChart;
