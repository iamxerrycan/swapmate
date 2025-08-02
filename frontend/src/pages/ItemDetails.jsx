import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import API from '../utils/axiosInstance';
import './ItemDetails.css';

export default function ItemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.items);
  const { user } = useSelector((state) => state.auth); // Logged-in user

  const [item, setItem] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
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
  }, [id, items]);

  if (error) return <p className="error">{error}</p>;
  if (!item) return <p className="loading">Loading item details...</p>;

  // ✅ Correctly resolve user ID (whether it's string or object)
  const itemOwnerId = typeof item.user === 'string' ? item.user : item.user?._id;
  const currentUserId = user?._id || 'not_logged_in';
  const isOwner = itemOwnerId === currentUserId;
  console.log("From Redux - user:", user);
console.log("user._id:", user?._id);


  // ✅ Logs for debugging
  console.log("item.user:", item.user);
  console.log("Logged in user._id:", currentUserId);
  console.log("Resolved itemOwnerId:", itemOwnerId);
  console.log("isOwner:", isOwner);

  return (
    <div className="item-details-container">
      <div className="item-card">
        <h2>{item.name}</h2>
        <p><strong>Description:</strong> {item.description}</p>
        <p><strong>Category:</strong> {item.category}</p>
        <p><strong>Address:</strong> {item.address || 'N/A'}</p>
        <p><strong>Owner ID:</strong> {itemOwnerId || 'Unknown'}</p>
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
