import './ItemCardMini.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function ItemCardMini({ item }) {
  const [flipped, setFlipped] = useState(false);
  const navigate = useNavigate();

  const handleSwapClick = () => {
    navigate(`/dashboard/swapitem/${item._id}`);
  };

  return (
    <div className={`item-card-mini ${flipped ? 'flipped' : ''}`}>
      <div className="flip-card-inner">

        {/* Front Side */}
        <div className="flip-card-front">
          <img
            src={item.image || '/placeholder.jpg'}
            alt={item.name}
            className="item-card-image"
          />
          <div className="item-card-info">
            <h4 className="item-card-title">Item: {item.name}</h4>
            <p className="item-card-category">Category: {item.category}</p>
            <p className="item-card-location">Address: {item.address || 'Unknown Address'}</p>
            <p className="item-card-description">Description: {item.description || 'No description.'}</p>
          </div>
          <div className="item-card-actions">
            <button className="btn-view" onClick={() => setFlipped(true)}>View</button>
          </div>
        </div>

        {/* Back Side */}
        <div className="flip-card-back">
          <button className="btn-close" onClick={() => setFlipped(false)}>✕</button>
          <div className="item-card-info">
            <h4 className="item-card-title">{item.name}</h4>
            <p><strong>Category:</strong> {item.category}</p>
            <p><strong>Condition:</strong> {item.condition}</p>
            <p><strong>Type:</strong> {item.type}</p>
            <p><strong>Swap Status:</strong> {item.swapStatus}</p>
            <p><strong>Swap Requested:</strong> {item.hasSwapRequest ? 'Yes' : 'No'}</p>
            <p><strong>Swapped:</strong> {item.isSwapped ? 'Yes' : 'No'}</p>
            <p><strong>Swap Date:</strong> {item.swapDate || 'Not set'}</p>
            <p><strong>Address:</strong> {item.address || 'Unknown Address'}</p>
            <p><strong>Description:</strong> {item.description || 'No description.'}</p>
            <p><strong>Tags:</strong> {item.tags && item.tags.length > 0 ? item.tags.join(', ') : 'None'}</p>
            <p><strong>Posted by:</strong> {item.user?.name || 'Anonymous'} ({item.user?.email})</p>
            <p><strong>Created At:</strong> {new Date(item.createdAt).toLocaleString()}</p>
          </div>
          <div className="item-card-actions">
            <button className="btn-swap" onClick={handleSwapClick}>Swap This Item →</button>
          </div>
        </div>

      </div>
    </div>
  );
}
