import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateProfile, deleteProfile } from '../features/profile/profileSlice';
import ItemCard from '../components/ui/ItemCard';
import { fetchItems } from '../features/items/itemSlice';
import { useState, useEffect } from 'react';
import './Profile.css';
import { confirmToast } from '../components/ui/ConfirmToast';
import { toast } from 'react-toastify';

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.items);

  const currentUserId = user?.user?._id;

  const myItems = Array.isArray(items)
    ? items.filter(
        (item) => String(item.user?._id || item.user) === String(currentUserId)
      )
    : [];

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

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
    if (result.meta.requestStatus === 'fulfilled') {
      toast.success('Profile updated successfully');
    }
    setIsEditing(false);
    navigate('/profile');
  };

  const handleCreateItem = () => {
    navigate('/create-item');
  };

  const handleDelete = () => {
  confirmToast(async () => {
    const result = await dispatch(deleteProfile());
    if (result.meta.requestStatus === 'fulfilled') {
      toast.success('Profile deleted successfully');
      navigate('/register');
    } else {
      toast.error(result.payload || 'Failed to delete profile');
    }
  });
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
            <button onClick={handleSave} className="save-btn">
              Save
            </button>
          </div>
        ) : (
          <div className="three-buttons">
            <button onClick={handleEditToggle} className="edit-btn">
              Edit Profile
            </button>
            <button onClick={handleCreateItem} className="edit-btn">
              Create New Item
            </button>
            <button onClick={handleDelete} className="edit-btn">
              Delete Profile
            </button>
          </div>
        )}
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




// .edit-form input {
//   padding: 0.5rem 1rem;
//   margin: 0.5rem 1rem 0.5rem 0;
//   border: 1px solid var(--border);
//   border-radius: 6px;
//   width: 200px;
// }

// .edit-form-row {
//   display: flex;
//   flex-wrap: wrap;
//   align-items: center;
//   gap: 0.5rem;
//   margin-top: 1rem;
// }

// .edit-form-row input {
//   flex: 1 1 200px;
//   min-width: 150px;
//   padding: 0.5rem;
//   border: 1px solid var(--border);
//   border-radius: 6px;
//   font-size: 0.9rem;
//   background-color: var(--bg);
//   color: var(--text);
// }
// .edit-form-row input:focus {
//   outline: 2px solid var(--primary);
//   background-color: var(--bg);
// }

