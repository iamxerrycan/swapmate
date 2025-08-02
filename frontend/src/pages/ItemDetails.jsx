// src/pages/ItemDetails.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import API from '../utils/axiosInstance';
import './ItemDetails.css';

export default function ItemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.items);
  const { user } = useSelector((state) => state.auth);

  const [item, setItem] = useState(null);
  const [error, setError] = useState('');

  // If not logged in, redirect
  useEffect(() => {
    if (!user || !user?.user?._id) {
      setError('Login required to view item details.');
      const timeout = setTimeout(() => navigate('/login'), 2000);
      return () => clearTimeout(timeout);
    }
  }, [user, navigate]);

  // Load item (from Redux or API)
  useEffect(() => {
    if (!user || !user?.user?._id) return;

    const foundItem = items.find((i) => i._id === id);
    if (foundItem) {
      setItem(foundItem);
    } else {
      const fetchItem = async () => {
        try {
          const res = await API.get(`/api/items/${id}`);
          setItem(res.data);
        } catch (err) {
          setError(err.response?.data?.message || 'Item not found or server error.');
        }
      };
      fetchItem();
    }
  }, [id, items, user]);

  if (error) return <p className="error">{error}</p>;
  if (!item) return <p className="loading">Loading item details...</p>;

  const itemOwnerId = typeof item.user === 'string' ? item.user : item.user?._id;
  const currentUserId = user?.user?._id;
  const isOwner = itemOwnerId === currentUserId;

  return (
    <div className="item-details-container">
      <div className="item-card">
        <h2>{item.name}</h2>
        <p><strong>Description:</strong> {item.description}</p>
        <p><strong>Category:</strong> {item.category}</p>
        <p><strong>Address:</strong> {item.address || 'N/A'}</p>
        <p><strong>Status:</strong> {item.swapStatus}</p>

        <div className="two-buttons">
          {isOwner ? (
            <>
              <button onClick={() => navigate(`/edit-item/${item._id}`)} className="edit-btn">✏️ Edit</button>
              <button onClick={() => navigate(-1)} className="close-btn">❌ Close</button>
            </>
          ) : (
            <>
              <button onClick={() => navigate(`/swap-item/${item._id}`)} className="swap-btn">🔁 Swap</button>
              <button onClick={() => navigate(-1)} className="close-btn">❌ Close</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
