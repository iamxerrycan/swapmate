// src/pages/dashboard/components/DashboardSidebar.jsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../features/auth/authSlice';
import './DashboardSidebar.css';

export default function DashboardSidebar() {
  const { user: userWrapper } = useSelector((state) => state.auth);
  const user = userWrapper?.user;
  const dispatch = useDispatch();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);
  const close = () => setOpen(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => (document.body.style.overflow = "");
  }, [open]);

  const isActive = (path) => location.pathname === path;
  const handleLogout = () => dispatch(logout());
  const role = user?.isAdmin ? 'Admin' : 'User';

  return (
    <>
      <button className="sidebar-toggle" onClick={toggle}>
        {open ? <FiX size={18} /> : <FiMenu size={18} />}
      </button>

      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="sidebar-content">
          <div className="sidebar-header">
            <div className="sidebar-logo">SwapMate</div>
            <div className="sidebar-user">
              <img src={`https://ui-avatars.com/api/?name=${user?.name}`} alt="User" className="sidebar-avatar" />
              <div>
                <div className="sidebar-username">{user?.name}</div>
                <div className="sidebar-role">Role: {role}</div>
              </div>
            </div>
          </div>

          <nav className="sidebar-nav">
            <Link to="/dashboard" className={isActive('/dashboard') ? 'active' : ''} onClick={close}>Dashboard</Link>
            <Link to="/dashboard/profile" className={isActive('/dashboard/profile') ? 'active' : ''} onClick={close}>Profile</Link>
            <Link to="/dashboard/chat" className={isActive('/dashboard/chat') ? 'active' : ''} onClick={close}>Chat</Link>
            <Link to="/dashboard/settings" className={isActive('/dashboard/settings') ? 'active' : ''} onClick={close}>Settings</Link>
            <Link to= "/dashboard/swapitem" className={isActive('/dashboard/swapitem') ? 'active' : ''} onClick={close}>Swap Item</Link>

            {user?.isAdmin && (
              <>
                <Link to="/dashboard/users" className={isActive('/dashboard/users') ? 'active' : ''} onClick={close}>Manage Users</Link>
                <Link to="/dashboard/items" className={isActive('/dashboard/items') ? 'active' : ''} onClick={close}>Manage Items</Link>
                <Link to="/dashboard/reports" className={isActive('/dashboard/reports') ? 'active' : ''} onClick={close}>Reports</Link>
                <Link to="/dashboard/site-settings" className={isActive('/dashboard/site-settings') ? 'active' : ''} onClick={close}>Site Settings</Link>
              </>
            )}
          </nav>

          <button className="logout-button" onClick={() => { handleLogout(); close(); }}>
            Log out
          </button>
        </div>
      </aside>

      {open && <div className="sidebar-overlay" onClick={close} />}
    </>
  );
}
