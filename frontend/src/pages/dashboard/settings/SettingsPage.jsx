import React from 'react';
import { Lock, Download, Trash2, Settings } from 'lucide-react'; // Icons
import './SettingsPage.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../features/auth/authSlice';
import { deleteAccount } from '../../../features/users/userSlice';
import { toast } from 'react-toastify';
import { confirmToast } from '../../../components/ui/ConfirmToast';


const SettingsPage = ({ isAdmin = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const token = user.token;

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
    <div className="settings-container">
      <h2 className="settings-title">Settings</h2>

      {/* 🔔 Notification Settings */}
      <section className="setting-section">
        <h3 className="section-title">Notifications</h3>
        <div className="setting-item">
          <label className="setting-label">Email Notifications</label>
          <label className="toggle-switch">
            <input type="checkbox" defaultChecked />
            <span className="slider"></span>
          </label>
        </div>
        <div className="setting-item">
          <label className="setting-label">Push Notifications</label>
          <label className="toggle-switch">
            <input type="checkbox" />
            <span className="slider"></span>
          </label>
        </div>
      </section>

      {/* 🎨 Display Settings */}
      <section className="setting-section">
        <h3 className="section-title">Appearance</h3>
        <div className="setting-item">
          <label className="setting-label">Dark Mode</label>
          <label className="toggle-switch">
            <input type="checkbox" />
            <span className="slider"></span>
          </label>
        </div>
      </section>

      {/* 🔐 Security Settings */}
      <section className="setting-section">
        <h3 className="section-title">Security</h3>
        <div className="setting-item">
          <label className="setting-label">Change Password</label>
          <button className="icon-button">
            <Lock size={18} />
          </button>
        </div>
      </section>

      {/* ⚙️ Admin Settings */}
      {isAdmin && (
        <section className="setting-section">
          <h3 className="section-title">Admin Settings</h3>
          <div className="setting-item">
            <label className="setting-label">Enable Maintenance Mode</label>
            <label className="toggle-switch">
              <input type="checkbox" />
              <span className="slider"></span>
            </label>
          </div>
          <div className="setting-item">
            <label className="setting-label">Allow User Registration</label>
            <label className="toggle-switch">
              <input type="checkbox" defaultChecked />
              <span className="slider"></span>
            </label>
          </div>
        </section>
      )}

      {/* 🧹 Data & Privacy */}
      <section className="setting-section">
        <h3 className="section-title">Data & Privacy</h3>
        <div className="setting-item">
          <label className="setting-label">Download My Data</label>
          <button className="icon-button">
            <Download size={18} />
          </button>
        </div>
        <div className="setting-item">
          <label className="setting-label">Delete My Account</label>
          <button className="icon-button danger" onClick={handleDelete}>
            <Trash2 size={18} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default SettingsPage;
