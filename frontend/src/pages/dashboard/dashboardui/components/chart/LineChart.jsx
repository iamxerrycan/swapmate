// src/components/dashboard/charts/LineChart.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = ({ stats }) => {
  const data = {
    labels: ['Swapped', 'Fulfilled', 'Cancelled'],
    datasets: [
      {
        label: 'Transactions',
        data: [stats.swapped, stats.fulfilled, stats.cancelled],
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99,102,241,0.2)',
        tension: 0.3,
        fill: true,
      },
    ],
  };

  return (
    <div className="chart-container">
      <h3>Transactions Summary</h3>
      <Line data={data} options={{ responsive: true }} />
    </div>
  );
};

export default LineChart;
