// src/pages/dashboard/profile/AdminProfile.jsx

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../../features/auth/authSlice';
import { deleteAccount } from '../../../features/users/userSlice';
import { toast } from 'react-toastify';
import './AdminProfile.css';

const AdminProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user: userWrapper, token } = useSelector((state) => state.auth);
  const user = userWrapper?.user;

  console.log('User:', user);
  console.log('====================================');
  console.log(user);
  console.log('====================================');
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    toast.success('Logged out successfully');
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      try {
        await dispatch(deleteAccount(token)).unwrap();
        dispatch(logout());
        toast.success('Account deleted successfully');
        navigate('/');
      } catch (error) {
        toast.error(error || 'Failed to delete account');
      }
    }
  };

  return (
    <div className="admin-profile-container">
      <div className="profile-card">
        <div className="profile-avatar">
          {user?.profilePic ? (
            <img src={user.profilePic} alt="Profile" />
          ) : (
            <div className="avatar-placeholder">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
          )}
        </div>

        <div className="profile-info">
          <h2>{user.name}</h2>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Role:</strong> {user.isAdmin ? 'Admin' : 'User'}
          </p>
          <p>
            <strong>Status:</strong>{' '}
            {user.isOnline ? '🟢 Online' : '⚪ Offline'}
          </p>
          <p>
            <strong>User ID:</strong> {user._id}
          </p>
          <p>
            <strong>Joined:</strong> {new Date(user.createdAt).toLocaleString()}
          </p>
        </div>

        <div className="profile-actions">
          <Link to="/dashboard/create" className="btn">
            ➕ Create Item
          </Link>
          <Link to="/dashboard/update" className="btn">
            ✏️ Update Item
          </Link>
          <Link to="/dashboard/delete" className="btn">
            ❌ Delete Item
          </Link>
          <button onClick={handleLogout} className="btn logout">
            🚪 Logout
          </button>
          <button onClick={handleDelete} className="btn danger">
            🗑️ Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
