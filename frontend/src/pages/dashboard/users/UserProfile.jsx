import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../../utils/api/axiosInstance';
import './UserProfile.css';
import { CircleUserRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  console.log('user', user);
  console.log('items', items);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userRes = await API.get(`/api/user/${id}`);
        setUser(userRes.data);

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
    return <p className="loading-text">Loading...</p>;
  }

  if (error) {
    return <p className="error-text">{error}</p>;
  }

  if (!user) {
    return <p className="not-found-text">User not found</p>;
  }

  return (
    <div className="user-profile-page">
      {/* Profile Header */}
      <div className="profile-header">
        {user.profilePic ? (
          <img
            src={user.profilePic}
            alt={user.name}
            className="profile-pic"
          />
        ) : (
          <CircleUserRound size={128} color="#ccc" />
        )}
        <h2 className="profile-name">{user.name}</h2>
        <p className="profile-email"><strong>Email:</strong> {user.email}</p>
        {user.bio && <p className="profile-bio"><strong>Bio:</strong> {user.bio}</p>}
        <p><strong>Member Since:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
        <p><strong>Admin Status:</strong> {user.isAdmin ? 'Yes' : 'No'}</p>
        <button onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
        {/* Add more user fields here if needed */}
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
                  {/* Add any other item fields you want to display */}
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
