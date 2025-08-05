// ItemCategoryChart.jsx
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import './ItemCategoryChart.css';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['Books', 'Electronics', 'Clothing', 'Toys', 'Other'],
  datasets: [
    {
      label: 'Item Categories',
      data: [15, 25, 30, 10, 20], // Example % values
      backgroundColor: [
        '#6366f1',
        '#ec4899',
        '#10b981',
        '#f59e0b',
        '#f87171',
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  cutout: '70%', // donut style
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
  },
};

const ItemCategoryChart = () => {
  return (
    <div className="item-category-chart">
      <h3 className="chart-title">Item Categories</h3>
      <div className="chart-wrapper">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default ItemCategoryChart;
