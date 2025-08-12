import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../../../utils/api/axiosInstance';
import './UserProfile.css';
import { CircleUserRound, Undo2 } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../../components/ui/Loader';

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [me, setMe] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Logged-in user
        const meRes = await API.get('/api/user/me');
        setMe(meRes.data);

        // Profile user
        const userRes = await API.get(`/api/user/${id}`);
        setUser(userRes.data);

        // Items for user
        const itemsRes = await API.get(`/api/items/user/${id}`);
        setItems(itemsRes.data);
      } catch {
        setError('Failed to load user profile');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSwapClick = (itemId) => {
    if (me && user && me._id === user._id) {
      toast.info("You can't swap your own item");
      return;
    }
    navigate(`/dashboard/swapitem/${itemId}`);
  };

  // New chat start / navigate function
  const handleChatClick = async () => {
    if (me && user && me._id === user._id) {
      toast.info("You can't chat with yourself");
      return;
    }
    try {
      // Call backend to start or get existing chat between users
      const res = await API.post('/api/chat/start', {
        fromUserId: me._id,
        toUserId: user._id,
      });

      const chat = res.data;
      // Navigate to chat page, passing other user info in state
      navigate(`/dashboard/chat/${chat._id}`, {
        state: {
          otherUser: user,
          chatId: chat._id,
          participants: chat.participants,
          swapId: chat.swapId || null,
        },
      });
    } catch (error) {
      toast.error('Failed to start chat');
      console.error(error);
    }
  };

  if (loading) return <p className="loading-text"> {<Loader fullHeight={true} />}</p>;
  if (error) return <p className="error-text">{error}</p>;
  if (!user) return <p className="not-found-text">User not found</p>;

  return (
    <div className="user-profile-page">
      {/* Profile Header */}
      <div className="profile-header" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {user.profilePic ? (
          <img src={user.profilePic} alt={user.name} className="profile-pic" />
        ) : (
          <CircleUserRound size={128} color="#ccc" />
        )}
        <div>
          <h2 className="profile-name">{user.name}</h2>
          <p className="profile-email"><strong>Email:</strong> {user.email}</p>
          {user.bio && <p className="profile-bio"><strong>Bio:</strong> {user.bio}</p>}
          <p><strong>Member Since:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
          <p><strong>Admin Status:</strong> {user.isAdmin ? 'Yes' : 'No'}</p>
          {/* Chat Button */}
          <button
            onClick={handleChatClick}
            style={{
              padding: '8px 16px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '8px',
            }}
            disabled={me && user && me._id === user._id}
          >
            Chat with {user.name}
          </button>
          {/* Back button */}
          <button onClick={() => navigate('/dashboard')} style={{ marginLeft: '1rem' }}>
            <Undo2 size={20} />
          </button>
        </div>
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
                    onClick={() => handleSwapClick(item._id)}
                    disabled={me && user && me._id === user._id}
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
