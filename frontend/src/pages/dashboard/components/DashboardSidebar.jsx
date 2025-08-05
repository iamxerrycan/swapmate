// src/pages/dashboard/components/DashboardSidebar.jsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import './DashboardSidebar.css';

export default function DashboardSidebar() {
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const toggle = () => setOpen(!open);
  const close = () => setOpen(false);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <button className="sidebar-toggle" onClick={toggle}>
        {open ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <h2 className="sidebar-logo">SwapMate</h2>

        <nav className="sidebar-nav">
          <Link to="/dashboard" className={isActive('/dashboard') ? 'active' : ''} onClick={close}>Home</Link>
          <Link to="/dashboard/profile" className={isActive('/dashboard/profile') ? 'active' : ''} onClick={close}>My Profile</Link>
          <Link to="/dashboard/chat" className={isActive('/dashboard/chat') ? 'active' : ''} onClick={close}>Chat</Link>
          <Link to="/dashboard/settings" className={isActive('/dashboard/settings') ? 'active' : ''} onClick={close}>Settings</Link>

          {user?.isAdmin && (
            <>
              <hr />
              <span className="sidebar-section">Admin Panel</span>
              <Link to="/dashboard/users" className={isActive('/dashboard/users') ? 'active' : ''} onClick={close}>Manage Users</Link>
              <Link to="/dashboard/reports" className={isActive('/dashboard/reports') ? 'active' : ''} onClick={close}>Reports</Link>
              <Link to="/dashboard/site-settings" className={isActive('/dashboard/site-settings') ? 'active' : ''} onClick={close}>Site Settings</Link>
            </>
          )}
        </nav>
      </aside>
    </>
  );
}
