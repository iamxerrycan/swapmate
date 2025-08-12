import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import API from '../../../../../utils/api/axiosInstance';
import './UserDashboardChart.css';
import Loader from '../../../../../components/ui/Loader';

export default function UserDashboardChart() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSwaps = async () => {
      try {
        const res = await API.get('/api/swaps/my'); // or /api/swaps/swaps for admin
        const swaps = res.data;

        // Aggregate swaps by weekday
        const counts = {
          Mon: 0,
          Tue: 0,
          Wed: 0,
          Thu: 0,
          Fri: 0,
          Sat: 0,
          Sun: 0,
        };

        swaps.forEach((swap) => {
          const day = new Date(swap.createdAt).toLocaleDateString('en-US', {
            weekday: 'short',
          });
          if (counts[day] !== undefined) {
            counts[day] += 1;
          }
        });

        // Convert to Recharts format
        const formattedData = Object.keys(counts).map((day) => ({
          name: day,
          swaps: counts[day],
        }));

        setChartData(formattedData);
      } catch (error) {
        console.error('Error fetching swaps data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSwaps();
  }, []);

  if (loading) return <p>{<Loader fullHeight={true} />}</p>;

  return (
    <div className="dashboard-chart">
      <h3>Weekly Swaps</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="swaps"
            stroke="#6d28d9"
            strokeWidth={3}
            dot={{ r: 5 }}
          />
          <CartesianGrid stroke="#e5e7eb" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
