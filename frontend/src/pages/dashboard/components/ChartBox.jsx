// src/pages/dashboard/components/ChartBox.jsx

import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import 'chartjs-adapter-date-fns';

export default function ChartBox({ title, data, options }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-3">{title}</h2>
      <Line data={data} options={options} />
    </div>
  );
}

