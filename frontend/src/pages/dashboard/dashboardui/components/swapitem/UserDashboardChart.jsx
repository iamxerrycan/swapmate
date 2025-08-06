import React from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import './UserDashboardChart.css';

const data = [
  { name: 'Mon', swaps: 4 },
  { name: 'Tue', swaps: 2 },
  { name: 'Wed', swaps: 6 },
  { name: 'Thu', swaps: 3 },
  { name: 'Fri', swaps: 7 },
];

export default function UserDashboardChart() {
  return (
    <div className="dashboard-chart">
      <h3>Weekly Swaps</h3>
      <LineChart width={300} height={200} data={data}>
        <Line type="monotone" dataKey="swaps" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </div>
  );
}
