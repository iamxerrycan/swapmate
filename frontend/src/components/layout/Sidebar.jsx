// src/components/layout/Sidebar.jsx

import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Sidebar.css'; // you can use Tailwind or CSS module

const Sidebar = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="sidebar w-64 h-screen bg-gray-900 text-white flex flex-col p-4 shadow-xl">
      <h2 className="text-2xl font-bold mb-6">📊 Dashboard</h2>

      {/* Common Links */}
      <NavLink to="/dashboard/profile" className="sidebar-link">👤 My Profile</NavLink>
      <NavLink to="/dashboard/my-items" className="sidebar-link">📦 My Items</NavLink>

      {/* Admin Only */}
      {user?.isAdmin && (
        <>
          <div className="mt-6 mb-2 border-t pt-4 border-gray-700 text-gray-400">Admin Panel</div>
          <NavLink to="/dashboard/users" className="sidebar-link">🧑‍💻 Manage Users</NavLink>
          <NavLink to="/dashboard/admin" className="sidebar-link">⚙️ Admin Panel</NavLink>
        </>
      )}
    </div>
  );
};

export default Sidebar;
