// src/components/dashboard/charts/UserTransactionsLineChart.jsx
import React from 'react';
import useUserStats from '../../../../../hooks/UseUserStats';
import LineChart from './LineChart';

const UserTransactionsLineChart = () => {
  const { stats, loading, error } = useUserStats();

  if (loading) return <div className="chart-container">{<Loader fullHeight={true} />}</div>;
  if (error) return <div className="chart-container error">{error}</div>;

  return (
    <div className="chart-container">
      <LineChart stats={stats} />
    </div>
  );
};

export default UserTransactionsLineChart;
