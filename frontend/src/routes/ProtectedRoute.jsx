import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

// export default function ProtectedRoute({ children }) {
//   const token = useSelector((state) => state.auth.token);

//   if (!token) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// }


export default function ProtectedRoute({ children, allowedRoles }) {
  const { token, role } = useSelector((state) => state.auth);

  if (!token) return <Navigate to="/" replace />;
  if (allowedRoles && !allowedRoles.includes(role)) return <Navigate to="/unauthorized" replace />;

  return children;
}

//use this component to protect routes

{/* <ProtectedRoute allowedRoles={['admin']}>
  <AdminPage />
</ProtectedRoute> */}