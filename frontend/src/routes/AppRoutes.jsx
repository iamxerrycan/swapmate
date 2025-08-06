// src/routes/AppRoutes.jsx
import { Routes, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';

import Home from '../pages/Home';
import ItemDetails from '../pages/ItemDetails';
import Profile from '../pages/Profile';
// import CreateItem from '../pages/CreateItem';
// import SwapItem from '../pages/SwapRequest';

import AppLayout from '../components/layout/AppLayoute';
import DashboardLayout from '../pages/dashboard/sidebartopbarlayout/DashboardLayout';
import ProtectedRoute from './ProtectedRoute';

// Dashboard pages
import UsersPage from '../pages/dashboard/users/UsersPage';
import AdminProfile from '../pages/dashboard/profile/AdminProfile';
import AnalyticsPage from '../pages/dashboard/analytics/AnalyticsPage';
import CreateItem from '../pages/dashboard/dashboardui/components/CreateItemModal';
// import NotificationsPage from '../pages/dashboard/sidebartopbarlayout/NotificationsPage';
import ActivityLogPage from '../pages/dashboard/activity/ActivityLogPage';
import ChatPage from '../pages/dashboard/chat/ChatPage';
import SettingsPage from '../pages/dashboard/settings/SettingsPage';
import DashboardMain from '../pages/dashboard/dashboardui/DashboardMain';
import { ImageOff, Import } from 'lucide-react';
import ManageItems from '../pages/dashboard/dashboardui/components/ManageItems';
import EditItem from '../pages/dashboard/dashboardui/components/EditItem';
import SwapItem from '../pages/dashboard/dashboardui/components/SwapItem';

export default function AppRoutes() {
  return (
    <Routes>
      {/* 🔓 Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      {/* 🔐 User-Protected Routes (with layout) */}
      <Route element={<ProtectedRoute />}>
        <Route
          path="/home"
          element={
            <AppLayout>
              <Home />
            </AppLayout>
          }
        />
        <Route
          path="/item/:id"
          element={
            <AppLayout>
              <ItemDetails />
            </AppLayout>
          }
        />
        <Route
          path="/create-item"
          element={
            <AppLayout>
              <CreateItem />
            </AppLayout>
          }
        />
        <Route
          path="/edit-item/:id"
          element={
            <AppLayout>
              <EditItem />
            </AppLayout>
          }
        />
        <Route
          path="/swap-item/:id"
          element={
            <AppLayout>
              <SwapItem />
            </AppLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <AppLayout>
              <Profile />
            </AppLayout>
          }
        />
       
      </Route>

      {/* 🔐 Admin Dashboard Routes */}
      <Route element={<ProtectedRoute allowedRoles={['admin', 'user']} />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          {/* Admin-only pages */}
          <Route path="users" element={<UsersPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="activity" element={<ActivityLogPage />} />
          <Route path="create" element={<CreateItem />} />
          <Route path="manage" element={<ManageItems />} />
          <Route path="edit/:id" element={<EditItem />} />
          <Route path='swapitem' element={<SwapItem />} />

          {/* Shared pages */}
          <Route index element={<DashboardMain />} />
          <Route path="profile" element={<AdminProfile />} />
          {/* <Route path="notifications" element={<NotificationsPage />} /> */}
          <Route path="chat" element={<ChatPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
