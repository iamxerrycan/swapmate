import { useSelector } from 'react-redux';
import './Profile.css'; // Create this file
import { useNavigate } from 'react-router-dom';
import ItemCard from '../components/ui/ItemCard';

export default function Profile() {
  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.items);
  const navigate = useNavigate();

const currentUserId = user?.user?._id;

const myItems = Array.isArray(items)
  ? items.filter((item) =>
      String(item.user?._id || item.user) === String(currentUserId)
    )
  : [];

console.log("All items:", items);
console.log("Current User ID:", currentUserId);


  const handleCreateItem = () => {
    navigate('/create-item');
  };

  return (
    <div className="profile-container">
      <div>
        <h2>👤 {user?.user?.name}'s Profile</h2>
        <p>Email: {user?.user?.email}</p>

        <button className="create-item-button" onClick={handleCreateItem}>
        create item
        </button>
      </div>
      <h3>Your Items</h3>
      {myItems.length === 0 ? (
        <p className="no-items">You haven't listed any items yet.</p>
      ) : (
        <ul className="item-list">
          {myItems.map((item) => (
            <li key={item._id} className="item">
              <strong>{item.name}</strong> — {item.category}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
