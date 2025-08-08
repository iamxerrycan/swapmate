import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../../../utils/api/axiosInstance';
import './UserProfile.css';
import { CircleUserRound } from 'lucide-react';

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userRes = await API.get(`/api/user/${id}`);
        setUser(userRes.data);

        const itemsRes = await API.get(`/api/items/user/${id}`);
        setItems(itemsRes.data);
      } catch  {
        setError('Failed to load user profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  if (loading) return <p className="loading-text">Loading...</p>;
  if (error) return <p className="error-text">{error}</p>;
  if (!user) return <p className="not-found-text">User not found</p>;

  return (
    <div className="user-profile-page">
      {/* Profile Header */}
      <div className="profile-header">
        {user.profilePic ? (
          <img src={user.profilePic} alt={user.name} className="profile-pic" />
        ) : (
          <CircleUserRound size={128} color="#ccc" />
        )}
        <h2 className="profile-name">{user.name}</h2>
        <p className="profile-email"><strong>Email:</strong> {user.email}</p>
        {user.bio && <p className="profile-bio"><strong>Bio:</strong> {user.bio}</p>}
        <p><strong>Member Since:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
        <p><strong>Admin Status:</strong> {user.isAdmin ? 'Yes' : 'No'}</p>
      </div>

      {/* User Items */}
      <div className="user-items">
        <h3 className="items-header">{user.name}'s Items</h3>
        {items.length === 0 ? (
          <p className="no-items">No items found</p>
        ) : (
          <ul className="items-grid">
            {items.map((item) => (
              <li key={item._id} className="item-card">
                <img
                  src={item.image || '/placeholder-item.png'}
                  alt={item.name || item.title || 'Item Image'}
                  className="item-image"
                />
                <div className="item-content">
                  <h4 className="item-title">{item.name || item.title}</h4>
                  <p className="item-description"><strong>Description:</strong> {item.description}</p>
                  <p><strong>Category:</strong> {item.category}</p>
                  <p><strong>Condition:</strong> {item.condition}</p>
                  <p><strong>Address:</strong> {item.address}</p>
                  <p><strong>Created At:</strong> {new Date(item.createdAt).toLocaleDateString()}</p>
                  <p><strong>Swap Status:</strong> {item.swapStatus}</p>
                <button
  className="swap-button"
  onClick={() => navigate(`/dashboard/swapitem/${item._id}`)}
>
  Swap This Item
</button>
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
