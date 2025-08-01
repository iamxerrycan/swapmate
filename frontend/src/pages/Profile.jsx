import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../features/profile/profileSlice';
import ItemCard from '../components/ui/ItemCard';
import { useState } from 'react';
import './Profile.css';

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.items);

  const currentUserId = user?.user?._id;
  const myItems = Array.isArray(items)
    ? items.filter((item) => String(item.user?._id || item.user) === String(currentUserId))
    : [];

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.user?.name || '',
    email: user?.user?.email || '',
  });

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEditToggle = () => setIsEditing(!isEditing);

const handleSave = async () => {
  const result = await dispatch(updateProfile(formData));
  if (result.meta.requestStatus === "fulfilled") {
    alert("Profile updated successfully");
  }
};

  const handleCreateItem = () => {
    navigate('/create-item');
  };

  return (
    <div className="profile-wrapper">
      <section className="profile-header">
        <h1>👤 {user?.user?.name}'s Dashboard</h1>
        <p>Email: {user?.user?.email}</p>
        <p>User ID: {user?.user?._id}</p>

        {isEditing ? (
          <div className="edit-form-row">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="New name"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="New email"
            />
            <button onClick={handleSave} className="save-btn">Save</button>
          </div>
        ) : (
          <button onClick={handleEditToggle} className="edit-btn">Edit Profile</button>
        )}

        <button onClick={handleCreateItem} className="create-item-btn">+ Create New Item</button>
      </section>

      <section className="item-section">
        <h2>Your Listed Items</h2>
        {myItems.length === 0 ? (
          <p className="no-items">You haven’t listed anything yet.</p>
        ) : (
          <div className="items-grid">
            {myItems.map((item) => (
              <ItemCard key={item._id} item={item} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
