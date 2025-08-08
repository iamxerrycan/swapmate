// src/components/dashboard/charts/PieChart.jsx
import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ stats }) => {
  const data = {
    labels: ['Accepted', 'Rejected', 'Pending'],
    datasets: [
      {
        label: 'Request Status',
        data: [stats.accepted, stats.rejected, stats.pending],
        backgroundColor: ['#10b981', '#ef4444', '#f59e0b'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="chart-container">
      <h3>Status Distribution</h3>
      <Pie data={data} options={{ responsive: true }} />
    </div>
  );
};

export default PieChart;
