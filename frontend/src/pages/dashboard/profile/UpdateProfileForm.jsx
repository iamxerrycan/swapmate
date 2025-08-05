import React, { useState } from 'react';
import './UpdateProfileForm.css';

const UpdateProfileForm = ({ user, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    // profilePic: user?.profilePic || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="profile-modal__overlay">
      <div className="profile-modal__container">
        <div className="profile-modal__header">
          <h2 className="profile-modal__title">Update Profile</h2>
          <button className="profile-modal__close-btn" onClick={onClose}>&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="profile-modal__form">
          <div className="profile-modal__avatar-section">
            <div className="profile-modal__avatar-placeholder">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <p className="profile-modal__avatar-name">{formData.name}</p>
          </div>

          <div className="profile-modal__field">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your full name"
            />
          </div>

          <div className="profile-modal__field">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
            />
          </div>

          <div className="profile-modal__actions">
            <button type="submit" className="btn btn--primary">Save Changes</button>
            <button type="button" className="btn btn--secondary" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileForm;
