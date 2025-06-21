// import { useSelector } from 'react-redux';
// import './Profile.css'; // Create this file
// import { useNavigate } from 'react-router-dom';
// import ItemCard from '../components/ui/ItemCard';

// export default function Profile() {
//   const { user } = useSelector((state) => state.auth);
//   const { items } = useSelector((state) => state.items);
//   const navigate = useNavigate();

// const currentUserId = user?.user?._id;

// const myItems = Array.isArray(items)
//   ? items.filter((item) =>
//       String(item.user?._id || item.user) === String(currentUserId)
//     )
//   : [];

// console.log("All items:", items);
// console.log("Current User ID:", currentUserId);


//   const handleCreateItem = () => {
//     navigate('/create-item');
//   };

//   return (
//     <div className="profile-container">
//       <div>
//         <h2>👤 {user?.user?.name}'s Profile</h2>
//         <p>Email: {user?.user?.email}</p>

//         <button className="create-item-button" onClick={handleCreateItem}>
//         create item
//         </button>
//       </div>
//       <h3>Your Items</h3>
//       {myItems.length === 0 ? (
//         <p className="no-items">You haven't listed any items yet.</p>
//       ) : (
//         <ul className="item-list">
//           {myItems.map((item) => (
//             <li key={item._id} className="item">
//               <strong>{item.name}</strong> — {item.category}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

import { useSelector, useDispatch } from 'react-redux';
import './Profile.css';
import { useNavigate } from 'react-router-dom';
import ItemCard from '../components/ui/ItemCard';
import { updateProfile } from '../features/profile/profileSlice'; // Optional
import { useState } from 'react';

export default function Profile() {
  //  const { loading, success, error } = useSelector((state) => state.profile);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.items);
  const navigate = useNavigate();

  const currentUserId = user?.user?._id;
  const myItems = Array.isArray(items)
    ? items.filter((item) => String(item.user?._id || item.user) === String(currentUserId))
    : [];

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.user?.name || '',
    email: user?.user?.email || '',
  });

  const handleCreateItem = () => {
    navigate('/create-item');
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  

  const handleSave = () => {
    console.log('Updated user data:', formData);
    dispatch(updateProfile(formData)) // If API available
    setIsEditing(false);
  };

  return (
    <div className="profile-container">

      <h2>👤 {user?.user?.name}'s Profile</h2>
      <p>Email: {user?.user?.email}</p>
      <p>UserID : {user?.user?._id}</p>

      {isEditing ? (
        <div className="edit-form">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter new name"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter new email"
          />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <button onClick={handleEditToggle}>Edit Profile</button>
      )}

      <button className="create-item-button" onClick={handleCreateItem}>
        Create Item
      </button>

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
