import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/home" className="nav-link">Home</Link>
        {!token && (
          <>
            <Link to="/" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
          </>
        )}
      </div>

      {token && (
        <div className="nav-right">
          <Link to="/profile" className="nav-link">My Profile</Link>
          {user?.role === 'admin' && (
            <Link to="/admin/dashboard" className="nav-link">Dashboard</Link>
          )}
          <button className="nav-button" onClick={handleLogout}>Logout</button>
        </div>
      )}
    </nav>
  );
}
