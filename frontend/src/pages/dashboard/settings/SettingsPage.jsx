import React from 'react';
import './SettingsPage.css';

const SettingsPage = () => {
  return (
    <div className="settings-container">
      <h2 className="settings-title">Settings</h2>
      <div className="setting-item">
        <label className="setting-label" htmlFor="emailNotifications">Email Notifications</label>
        <label className="toggle-switch">
          <input type="checkbox" id="emailNotifications" defaultChecked />
          <span className="slider"></span>
        </label>
      </div>
      <div className="setting-item">
        <label className="setting-label" htmlFor="darkMode">Dark Mode</label>
        <label className="toggle-switch">
          <input type="checkbox" id="darkMode" />
          <span className="slider"></span>
        </label>
      </div>
    </div>
  );
};

export default SettingsPage;
