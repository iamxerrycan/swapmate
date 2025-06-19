import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import Home from '../pages/Home';
import ItemDetails from '../pages/ItemDetails';
import Profile from '../pages/Profile';
import AdminDashboard from '../pages/AdminDashboard';
import AppLayout from '../layoutes/AppLayoute';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Protected Pages with layout */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Home />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/item/:id"
        element={
          <ProtectedRoute>
            <AppLayout>
              <ItemDetails />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Profile />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* Admin Only */}
      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <AppLayout>
              <AdminDashboard />
            </AppLayout>
          </AdminRoute>
        }
      />
    </Routes>
  );
}
