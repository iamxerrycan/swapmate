// src/components/dashboard/charts/UserRequestsBarChart.jsx
import React from 'react';
import useUserStats from '../../../../../hooks/UseUserStats';
import BarChart from './BarChart';
import Loader from '../../../../../components/ui/Loader';

const UserRequestsBarChart = () => {
  const { stats, loading, error } = useUserStats();

  if (loading) return <div className="chart-container">{<Loader fullHeight={true} />}</div>;
  if (error) return <div className="chart-container error">{error}</div>;

  return (
    <div className="chart-container">
      <BarChart stats={stats} />
    </div>
  );
};

export default UserRequestsBarChart;
