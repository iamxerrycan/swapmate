// src/components/dashboard/charts/BarChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ stats }) => {
  const data = {
    labels: ['Listed', 'Swapped', 'Pending', 'Rejected', 'Accepted', 'Fulfilled', 'Cancelled'],
    datasets: [
      {
        label: 'Requests',
        data: [
          stats.listed,
          stats.swapped,
          stats.pending,
          stats.rejected,
          stats.accepted,
          stats.fulfilled,
          stats.cancelled,
        ],
        backgroundColor: [
          '#4f46e5',
          '#10b981',
          '#f59e0b',
          '#ef4444',
          '#3b82f6',
          '#8b5cf6',
          '#6b7280',
        ],
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="chart-container">
      <h3>Requests Overview</h3>
      <Bar data={data} options={{ responsive: true, plugins: { legend: { display: false } } }} />
    </div>
  );
};

export default BarChart;
