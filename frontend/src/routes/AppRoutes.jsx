// src/routes/AppRoutes.jsx
import { Routes, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';
import ChatList from '../pages/dashboard/chat/ChatList';

// import CreateItem from '../pages/CreateItem';
import UserProfile from '../pages/dashboard/users/UserProfile';
// import SwapItem from '../pages/SwapRequest';
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
import SwapItemPage from '../pages/dashboard/dashboardui/components/SwapItemPage';
import ManageSwap from '../pages/dashboard/manageswap/ManageSwap';
import NotificationsPage from '../pages/dashboard/notifications/NotificationsPage';

export default function AppRoutes() {
  return (
    <Routes>
      {/* 🔓 Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      {/* 🔓 Public / General User Profile */}
      <Route path="/user/:id" element={<UserProfile />} />

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
          <Route path="swapitem" element={<SwapItem />} />
          <Route path="swapitem/:itemId" element={<SwapItemPage />} />
          <Route path="manageswap" element={<ManageSwap />} />
          <Route path="notifications" element={<NotificationsPage />} />

          {/* Shared pages */}
          <Route index element={<DashboardMain />} />
          {/* <Route path="user/:id" element={<UserProfile />} /> */}
          <Route path="profile" element={<AdminProfile />} />
          {/* <Route path="notifications" element={<NotificationsPage />} /> */}
          <Route path="/dashboard/chat" element={<ChatList />} />
          <Route path="/dashboard/chat/:chatId" element={<ChatPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
