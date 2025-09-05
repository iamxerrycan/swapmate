// src/components/dashboard/charts/LineChart.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = ({ stats }) => {
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
        label: 'Transactions',
        data: [
          stats.listed,
          stats.swapped,
          stats.pending,
          stats.rejected,
          stats.accepted,
          stats.fulfilled,
          stats.cancelled,
        ],
        borderColor: '#6366f1', // Indigo
        backgroundColor: 'rgba(99,102,241,0.2)',
        tension: 0.3,
        fill: true,
        pointBackgroundColor: '#6366f1',
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // सिर्फ़ "Transactions" label hide कर दिया
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
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <h3>Transactions Summary</h3>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
