import './ItemCardMini.css';
import { useState } from 'react';

export default function ItemCardMini({ item }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className={`item-card-mini ${flipped ? 'flipped' : ''}`}>
      <div className="flip-card-inner">

        <div className="flip-card-front">
          <img
            src={item.image || '/placeholder.jpg'}
            alt={item.name}
            className="item-card-image"
          />
          <div className="item-card-info">
            <h4 className="item-card-title">{item.name}</h4>
            <p className="item-card-category">{item.category}</p>
            <p className="item-card-location">{item.address || 'Unknown Address'}</p>
          </div>
          <div className="item-card-actions">
            <button className="btn-view" onClick={() => setFlipped(true)}>View</button>
            <button className="btn-swap" onClick={() => alert('Redirect to swap page...')}>Swap</button>
          </div>
        </div>

        <div className="flip-card-back">
          <button className="btn-close" onClick={() => setFlipped(false)}>✕</button>
          <div className="item-card-info">
            <h4 className="item-card-title">{item.name}</h4>
            <p className="item-card-category">{item.category}</p>
            <p className="item-card-location">{item.address || 'Unknown Address'}</p>
            <p className="item-card-description">{item.description || 'No description.'}</p>
          </div>
          <div className="item-card-actions">
            <button className="btn-swap" onClick={() => alert('Proceed to swap')}>Swap This Item →</button>
          </div>
        </div>

      </div>
    </div>
  );
}
