import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createItem } from '../features/items/itemSlice';
import { useNavigate } from 'react-router-dom';
import './CreateItem.css';

export default function CreateItem() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    address: '',
    coordinates: '', // Will be auto-filled
  });

  // 📍 Auto-detect location when component mounts
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { longitude, latitude } = pos.coords;
          setFormData((prev) => ({
            ...prev,
            coordinates: `${longitude},${latitude}`,
          }));
        },
        (err) => {
          console.error('Geolocation error:', err);
          alert('Unable to fetch location. Please allow location access.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const [lng, lat] = formData.coordinates
        .split(',')
        .map((value) => parseFloat(value.trim()));

      const newItem = {
        name: formData.name,
        category: formData.category,
        description: formData.description,
        address: formData.address,
        coordinates: [lng, lat],
      };

      console.log('Submitting item:', newItem);
      await dispatch(createItem(newItem)).unwrap();
      navigate('/profile');
    } catch (err) {
      console.error('Create item failed:', err);
      alert('Failed to create item');
    }
  };

  return (
    <form className="create-item-form" onSubmit={handleSubmit}>
      <h2>Create New Item</h2>

      <input
        type="text"
        name="name"
        placeholder="Item Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
        //Books', 'Electronics', 'Clothes', 'Toys', 'Food', 'Other
      >
        <option value="">Select Category</option>
        <option value="Electronics">Electronics</option>
        <option value="Books">Books</option>
        <option value="Clothes">Clothes</option>
        <option value="Toys">Toys</option>
        <option value="Food">Food</option>
        <option value="Other">Other</option>
      </select>

      <textarea
        name="description"
        placeholder="Item Description"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="address"
        placeholder="Address (e.g., Howrah Station)"
        value={formData.address}
        onChange={handleChange}
        required
      />

      {/* Hidden or optional input to show auto-detected coordinates */}
      <input
        type="text"
        name="coordinates"
        placeholder="Coordinates (auto-filled)"
        value={formData.coordinates}
        readOnly
      />

      <button type="submit">Submit</button>
    </form>
  );
}
