// src/pages/UserProfile.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../../utils/api/axiosInstance';
import './UserProfile.css';

const UserProfile = () => {
  const { id } = useParams(); // userId from URL
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user details
        const userRes = await API.get(`/api/user/${id}`);
        setUser(userRes.data);

        // Fetch that user's items
        const itemsRes = await API.get(`/api/items/user/${id}`);
        setItems(itemsRes.data);
      } catch (err) {
        console.error('Failed to fetch user or items', err);
        setError('Failed to load user profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  if (loading) {
    return <p className="text-center py-4">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center py-4">{error}</p>;
  }

  if (!user) {
    return <p className="text-center py-4">User not found</p>;
  }

  return (
    <div className="user-profile-page max-w-4xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="profile-header flex flex-col items-center bg-white shadow-md rounded-lg p-6 mb-8">
        <img
          src={user.profilePic || '/default-avatar.png'}
          alt={user.name}
          className="w-32 h-32 rounded-full object-cover border-2 border-gray-300 mb-4"
        />
        <h2 className="text-2xl font-bold">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>
        {user.bio && <p className="mt-2 text-center text-gray-500">{user.bio}</p>}
      </div>

      {/* User Items */}
      <div className="user-items bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">{user.name}'s Items</h3>
        {items.length === 0 ? (
          <p className="text-gray-500">No items found</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <li
                key={item._id}
                className="item-card border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow"
              >
                <img
                  src={item.image || '/placeholder-item.png'}
                  alt={item.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="text-gray-500 text-sm line-clamp-3">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
