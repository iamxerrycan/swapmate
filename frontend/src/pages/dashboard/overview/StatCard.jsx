//src/pages/dashboard/components/StatCard.jsx
import React from 'react';

const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className="p-4 rounded-lg shadow-md bg-white flex items-center gap-4">
      <div className={`text-3xl ${color}`}>{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-xl font-semibold">{value}</h3>
      </div>
    </div>
  );
};

export default StatCard;
