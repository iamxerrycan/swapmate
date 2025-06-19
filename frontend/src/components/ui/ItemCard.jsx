import { useNavigate } from 'react-router-dom';
import './ItemCard.css'; // Create this file

export default function ItemCard({ item }) {
  const navigate = useNavigate();

  return (
    <div className="item-card" onClick={() => navigate(`/item/${item._id}`)}>
      <h3 className="item-title">{item.name}</h3>
      <p className="item-desc">{item.description}</p>
      <p className="item-meta">
        <strong>Category:</strong> {item.category}
      </p>
    </div>
  );
}
