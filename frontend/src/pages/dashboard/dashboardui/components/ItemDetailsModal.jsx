import './ItemDetailsModal.css';

export default function ItemDetailsModal({ item, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
        <img
          src={item.image || '/placeholder.jpg'}
          alt={item.name}
          className="modal-image"
        />
        <h2>{item.name}</h2>
        <p><strong>Category:</strong> {item.category}</p>
        <p><strong>Location:</strong> {item.address || 'Unknown'}</p>
        <p><strong>Description:</strong> {item.description || 'No description.'}</p>

        <button className="modal-next" onClick={() => alert('Go to swap now')}>
          Swap This Item →
        </button>
      </div>
    </div>
  );
}
