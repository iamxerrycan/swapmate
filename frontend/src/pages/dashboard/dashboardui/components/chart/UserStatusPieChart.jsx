// src/components/dashboard/charts/UserStatusPieChart.jsx
import React from 'react';
import useUserStats from '../../../../../hooks/UseUserStats';
import PieChart from './PieChart';

const UserStatusPieChart = () => {
  const { stats, loading, error } = useUserStats();

  if (loading) return <div className="chart-container">Loading chart...</div>;
  if (error) return <div className="chart-container error">{error}</div>;

  return (
    <div className="chart-container">
      <PieChart stats={stats} />
    </div>
  );
};

export default UserStatusPieChart;
