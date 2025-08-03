import { useNavigate } from 'react-router-dom';
import './ItemCard.css';

export default function ItemCard({ item }) {
  const navigate = useNavigate();

  // const formatDate = (dateStr) => {
  //   const date = new Date(dateStr);
  //   return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  // };

  return (
    <div className="item-card" onClick={() => navigate(`/item/${item._id}`)}>
      <div className="item-image">
        {item.image ? (
          <img src={item.image} alt={item.name} />
        ) : (
          <div className="placeholder-image">No Image</div>
        )}
      </div>

      <div className="item-info">
        <h2>{item.name}</h2>
        <p><strong>Description:</strong> {item.description}</p>
        <p><strong>Category:</strong> {item.category}</p>
        {/* <p><strong>Address:</strong> {item.address}</p> */}
        <p><strong>Swap Status:</strong> {item.swapStatus}</p>
        {/* <p><strong>Created At:</strong> {formatDate(item.createdAt)}</p> */}

        {/* <div className="user-info">
          <p><strong>Owner:</strong> {item.user?.name}</p>
          <p><strong>Email:</strong> {item.user?.email}</p>
        </div> */}
      </div>
    </div>
  );
}
