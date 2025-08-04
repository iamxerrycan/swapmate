// src/routes/AppRoutes.jsx
import { Routes, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';

import Home from '../pages/Home';
import ItemDetails from '../pages/ItemDetails';
import Profile from '../pages/Profile';
import CreateItem from '../pages/CreateItem';
import EditItem from '../pages/EditItem';
import SwapItem from '../pages/SwapRequest';

import AppLayout from '../components/layout/AppLayoute';
import DashboardLayout from '../components/layout/DashboardLayout'; // ✅ Dashboard layout
import ProtectedRoute from './ProtectedRoute';

// Admin Pages (Dashboard)
import DashboardPage from '../pages/admin/DashboardPage';
import UsersPage from '../pages/admin/UsersPage';
import MyProfilePage from '../pages/admin/MyProfilePage';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      {/* User Protected Routes */}
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

      {/* ✅ Admin Dashboard Nested Layout */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} /> {/* default /dashboard */}
        <Route path="overview" element={<DashboardPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="profile" element={<MyProfilePage />} />
      </Route>
    </Routes>
  );
}
