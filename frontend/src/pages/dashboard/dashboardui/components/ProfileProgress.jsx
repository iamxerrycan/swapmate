import React, { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import './ProfileProgress.css';
import API from '../../../../utils/api/axiosInstance';

const ProfileProgress = () => {
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    const fetchCompletion = async () => {
      try {
        const { data } = await API.get('/api/user/profile-completion');
        setCompletion(data?.completion || 0);
      } catch (err) {
        console.error('Error fetching profile completion:', err);
      }
    };

    fetchCompletion();
  }, []);

  return (
    <div className="profile-card">
      <div className="profile-header">
        <div className="profile-info">
          <FaUserCircle className="text-4xl text-blue-600" />
          <div>
            <h2 className="profile-title">Profile Completion</h2>
            <p className="profile-subtext">
              Complete your profile to unlock all features
            </p>
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
