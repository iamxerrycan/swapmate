// src/pages/dashboard/components/DashboardHeader.jsx
import './DashboardHeader.css';
import { useDispatch } from 'react-redux';
import { logout } from '../../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

export default function DashboardHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="dashboard-header">
      <div className="dashboard-actions">
        <button className="icon-button">🔔</button>
        <button className="icon-button">⚙️</button>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}
