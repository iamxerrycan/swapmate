// src/pages/dashboard/components/OverviewCard.jsx
import React from 'react';

export default function OverviewCard({ title, value, icon, bgColor }) {
  return (
    <div className={`flex items-center p-4 rounded-lg shadow-md ${bgColor || 'bg-white'}`}>
      <div className="text-3xl mr-4">{icon}</div>
      <div>
        <h3 className="text-sm text-gray-600">{title}</h3>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </div>
  );
}
