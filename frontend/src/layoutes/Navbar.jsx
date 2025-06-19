import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav
      style={{
        padding: '1rem',
        backgroundColor: '#f0f0f0',
        display: 'flex',
        gap: '1rem',
      }}
    >
      <Link to="/home">Home</Link>

      {token && (
        <>
          <Link to="/profile">My Profile</Link>

          {user?.role === 'admin' && (
            <Link to="/admin/dashboard">Dashboard</Link>
          )}

          <button onClick={handleLogout}>Logout</button>
        </>
      )}

      {!token && (
        <>
          <Link to="/">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}
