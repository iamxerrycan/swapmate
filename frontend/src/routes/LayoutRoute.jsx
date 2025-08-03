// src/routes/LayoutRoute.jsx
import AppLayout from '../components/layoutes/AppLayoute';
import ProtectedRoute from './ProtectedRoute';

export default function LayoutRoute({ children }) {
  return (
    <ProtectedRoute>
      <AppLayout>{children}</AppLayout>
    </ProtectedRoute>
  );
}
