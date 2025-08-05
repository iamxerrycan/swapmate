// src/routes/ProtectedRoute.jsx
// import { useSelector } from 'react-redux';
// import { Navigate } from 'react-router-dom';

// export default function ProtectedRoute({ children, allowedRoles }) {
//   const { token, user } = useSelector((state) => state.auth);

//   if (!token) return <Navigate to="/" replace />;
//   if (allowedRoles && !allowedRoles.includes(user?.role || (user?.isAdmin && 'admin'))) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   return children;
// }
// src/routes/ProtectedRoute.jsx
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  const { token, user } = useSelector((state) => state.auth);

  if (!token || !user) return <Navigate to="/" replace />;

  const userRole = user?.isAdmin ? 'admin' : 'user';

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
