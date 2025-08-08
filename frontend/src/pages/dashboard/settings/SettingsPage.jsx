import React from 'react';
import { Lock, Download, Trash2, Settings } from 'lucide-react'; // Icons
import './SettingsPage.css';

const SettingsPage = ({ isAdmin = false }) => {
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
          <button className="icon-button danger">
            <Trash2 size={18} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default SettingsPage;
