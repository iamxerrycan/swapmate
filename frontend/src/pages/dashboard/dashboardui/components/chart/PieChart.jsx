// src/components/dashboard/charts/PieChart.jsx
import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ stats }) => {
  const data = {
    labels: [
      'Listed',
      'Swapped',
      'Pending',
      'Rejected',
      'Accepted',
      'Fulfilled',
      'Cancelled',
    ],
    datasets: [
      {
        label: 'Request Status',
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
          '#3b82f6', // Listed → Blue
          '#8b5cf6', // Swapped → Purple
          '#f59e0b', // Pending → Yellow
          '#ef4444', // Rejected → Red
          '#10b981', // Accepted → Green
          '#06b6d4', // Fulfilled → Cyan
          '#6b7280', // Cancelled → Gray
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let value = context.raw;
            return `${context.label}: ${value}`;
          },
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <h3>Status Distribution</h3>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
