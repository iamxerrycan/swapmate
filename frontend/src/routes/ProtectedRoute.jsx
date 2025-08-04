// src/routes/ProtectedRoute.jsx
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { token, user } = useSelector((state) => state.auth);

  if (!token) return <Navigate to="/" replace />;
  if (allowedRoles && !allowedRoles.includes(user?.role || (user?.isAdmin && 'admin'))) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
