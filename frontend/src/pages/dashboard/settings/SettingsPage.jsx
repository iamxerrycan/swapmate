import React from 'react';

const SettingsPage = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Settings</h2>
      <div className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Email Notifications</label>
          <input type="checkbox" className="toggle" defaultChecked />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Dark Mode</label>
          <input type="checkbox" className="toggle" />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
