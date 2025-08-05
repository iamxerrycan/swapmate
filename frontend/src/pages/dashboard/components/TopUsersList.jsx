// src/pages/dashboard/components/TopUsersList.jsx
import React from 'react';

export default function TopUsersList({ users = [] }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Top Users</h2>
      <ul className="divide-y divide-gray-200">
        {users.length === 0 ? (
          <li className="text-gray-500">No top users available.</li>
        ) : (
          users.map((user) => (
            <li key={user._id} className="py-2 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {user.points} pts
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
