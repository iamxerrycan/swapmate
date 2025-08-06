import './ItemCardMini.css';
import { useState } from 'react';
import ItemDetailsModal from './ItemDetailsModal';

export default function ItemCardMini({ item }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='item-card-mini'>
      <img
        src={item.image || '/placeholder.jpg'}
        alt={item.name}
        className='item-card-image'
      />
      <div className='item-card-info'>
        <h4 className='item-card-title'>{item.name}</h4>
        <p className='item-card-category'>{item.category}</p>
        <p className='item-card-location'>{item.address || 'Unknown Address'}</p>
      </div>

      <div className='item-card-actions'>
        <button className='btn-view' onClick={() => setShowModal(true)}>
          View
        </button>
        <button
          className='btn-swap'
          onClick={() => alert('Redirect to swap page...')} // Replace with real navigation later
        >
          Swap
        </button>
      </div>

      {showModal && (
        <ItemDetailsModal item={item} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
