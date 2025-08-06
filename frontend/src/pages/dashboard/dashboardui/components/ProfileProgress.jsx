import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import './ProfileProgress.css';

const ProfileProgress = () => {
  const completion = 75;

  return (
    <div className="profile-card">
      <div className="profile-header">
        <div className="profile-info">
          <FaUserCircle className="text-4xl text-blue-600" />
          <div>
            <h2 className="profile-title">Profile Completion</h2>
            <p className="profile-subtext">Complete your profile to unlock all features</p>
          </div>
        </div>
        <button className="profile-upgrade-btn">Upgrade</button>
      </div>

      <div className="profile-bar-bg">
        <div
          className="profile-bar-fill"
          style={{ width: `${completion}%` }}
        ></div>
      </div>
      <p className="profile-completion-text">{completion}% completed</p>
    </div>
  );
};

export default ProfileProgress;
