// src/pages/dashboard/components/DashboardHeader.jsx
import './DashboardHeader.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

export default function DashboardHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="dashboard-header">
      <h1 className="dashboard-title">Welcome, {user?.name}</h1>

      <div className="dashboard-actions">
        <input type="text" placeholder="Search..." className="search-bar" />
        <button className="icon-button">🔔</button>
        <button className="icon-button">⚙️</button>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
}
