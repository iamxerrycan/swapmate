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
import CreateItem from '../pages/CreateItem';
import ResetPassword from '../pages/auth/ResetPassword';
import EditItem from '../pages/EditItem';
import SwapItem from '../pages/SwapRequest';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      {/* Protected Pages with layout */}

      <Route
        path="/create-item"
        element={
          <ProtectedRoute>
            <AppLayout>
              <CreateItem />
            </AppLayout>
          </ProtectedRoute>
        }
      />

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

      <Route
        path="/edit-item/:id"
        element={
          <ProtectedRoute>
            <AppLayout>
              <EditItem />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/swap-item/:id"
        element={
          <ProtectedRoute>
            <AppLayout>
              <SwapItem />
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
