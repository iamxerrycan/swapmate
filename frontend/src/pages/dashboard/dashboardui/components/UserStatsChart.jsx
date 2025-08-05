

// dashboardui/components/UserStatsChart.jsx
// src/pages/dashboard/dashboardui/components/UserStatsChart.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import './UserStatsChart.css';

// Register Chart.js components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title
);

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'User Growth',
      data: [200, 400, 600, 800, 900, 1200, 1400],
      backgroundColor: 'rgba(99, 102, 241, 0.2)', // Tailwind Indigo-500 with opacity
      borderColor: 'rgba(99, 102, 241, 1)',
      borderWidth: 2,
      tension: 0.4,
      fill: true,
      pointRadius: 5,
      pointBackgroundColor: '#6366F1',
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Monthly User Growth (2025)',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const UserStatsChart = () => {
  return (
    <div className="user-stats-chart">
      <h3 className="chart-title">📈 User Growth</h3>
      <div className="chart-render">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default UserStatsChart;
