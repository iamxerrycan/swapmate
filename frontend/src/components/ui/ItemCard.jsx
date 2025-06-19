import { useNavigate } from 'react-router-dom';

export default function ItemCard({ item }) {
  const navigate = useNavigate();
  console.log('ItemCard props:', item);
  return (
    <div
      onClick={() => navigate(`/item/${item._id}`)}
      style={{
        border: '1px solid #ccc',
        padding: '1rem',
        borderRadius: '8px',
        backgroundColor: '#fff',
        cursor: 'pointer',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
      }}
    >
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <p>
        <strong>Category:</strong> {item.category}
      </p>
    </div>
  );
}



