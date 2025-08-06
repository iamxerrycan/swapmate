import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../../features/auth/authSlice';
import {
  deleteAccount,
  updateProfile,
} from '../../../features/users/userSlice';
import { toast } from 'react-toastify';
import UpdateProfileForm from './UpdateProfileForm';
import './AdminProfile.css';
import {confirmToast} from "../../../components/ui/ConfirmToast";

const AdminProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user: userWrapper, token } = useSelector((state) => state.auth);
  const user = userWrapper?.user;

  const [showForm, setShowForm] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    toast.success('Logged out successfully');
  };

  const handleUpdate = async (formData) => {
    console.log('Updating with:', formData);
    try {
      await dispatch(updateProfile({ updatedData: formData, token })).unwrap();
      toast.success('Profile updated successfully');
      setShowForm(false);
    } catch (error) {
      console.error('Update error:', error);
      toast.error(error || 'Failed to update profile');
    }
  };

const handleDelete = () => {
  confirmToast(async () => {
    try {
      await dispatch(deleteAccount(token)).unwrap();
      dispatch(logout());
      toast.success('Account deleted successfully');
      navigate('/');
    } catch (error) {
      toast.error(error || 'Failed to delete account');
    }
  });
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

        <div className="profile-infoo">
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
          <button onClick={() => setShowForm(true)} className="btn update">
             Update Profile
          </button>
          <button onClick={handleLogout} className="btn logout">
             Logout
          </button>
          <button onClick={handleDelete} className="btn danger">
             Delete Account
          </button>
        </div>
      </div>

      {showForm && (
        <UpdateProfileForm
          user={user}
          onSubmit={handleUpdate}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default AdminProfile;
