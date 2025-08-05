//src/pages/ProfileScreen.jsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateProfile, reset } from '../features/profile/profileSlice';
import { toast } from 'react-toastify';

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { isSuccess, isError, message, isLoading } = useSelector((state) => state.profile);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
  });

  const { name, email, password } = formData;

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    if (isSuccess) {
      toast.success('Profile updated successfully');
    }
    if (isError) {
      toast.error(message);
    }

    return () => {
      dispatch(reset());
    };
  }, [user, isSuccess, isError, message, dispatch, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ name, email, password }));
  };

  return (
    <div className="profile-page">
      <h2 className="text-xl font-semibold mb-4">My Profile</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          placeholder="Full Name"
          required
        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          placeholder="New Password"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isLoading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
}
