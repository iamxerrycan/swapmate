//src/pages/dashboard/profile/AdminProfile.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../../features/auth/authSlice';
import { deleteAccount } from '../../../features/users/userSlice';
import { toast } from 'react-toastify';


const AdminProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    toast.success('Logged out successfully');
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      try {
        await dispatch(deleteAccount()).unwrap();
        dispatch(logout());
        toast.success('Account deleted');
        navigate('/');
      } catch (error) {
        toast.error(error.message || 'Error deleting account');
      }
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">My Profile</h2>
      <div className="border p-4 rounded shadow">
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Role:</strong> {user?.isAdmin ? 'Admin' : 'User'}</p>
      </div>

      <div className="mt-6 space-x-4">
        <Link
          to="/dashboard/create"
          className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Create Item
        </Link>

        <Link
          to="/dashboard/update"
          className="inline-block bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Update Item
        </Link>

        <Link
          to="/dashboard/delete"
          className="inline-block bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete Item
        </Link>

        <button
          onClick={handleLogout}
          className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Logout
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default AdminProfile;
