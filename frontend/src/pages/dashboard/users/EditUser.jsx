// src/pages/dashboard/users/EditUser.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, getAllUsers } from '../../../features/users/userSlice';
import './EditUser.css';

const EditUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users } = useSelector((state) => state.user);

  const user = users.find((u) => u._id === id);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    isAdmin: false,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      dispatch(getAllUsers());
    }
  }, [user, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ id, data: formData }));
    navigate('/dashboard/users');
  };

  return (
    <div className="edit-user-page">
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        <label>Email</label>
        <input value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        <label>
          <input type="checkbox" checked={formData.isAdmin} onChange={(e) => setFormData({ ...formData, isAdmin: e.target.checked })} />
          Is Admin
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditUser;
