// src/pages/dashboard/components/CreateItemModal.jsx

import { createItem } from '../../../../features/items/itemSlice';
import './CreateItemModal.css';
// src/pages/dashboard/components/CreateItemModal.jsx
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import './CreateItemModal.css';
import { useNavigate } from 'react-router-dom';

export default function CreateItemModal({ onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    address: '',
    coordinates: '',
  });

  const [errors, setErrors] = useState({});

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
          toast.error('Location access denied');
        }
      );
    } else {
      toast.error('Geolocation not supported by browser.');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const handleCancel = () => {
    if (onClose) {
      onClose();
    } else {
      navigate('/dashboard/manage');
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.category) errs.category = 'Category is required';
    if (!formData.description.trim())
      errs.description = 'Description is required';
    if (!formData.address.trim()) errs.address = 'Address is required';
    return errs;
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const timer = setTimeout(() => {
        setErrors({});
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const [lng, lat] = formData.coordinates
        .split(',')
        .map((val) => parseFloat(val.trim()));
      const newItem = {
        ...formData,
        coordinates: [lng, lat],
      };
      await dispatch(createItem(newItem)).unwrap();
      toast.success('Item created successfully');
      onClose();
    } catch (err) {
      console.error('Create item failed:', err);
      toast.error('Failed to create item');
    }
  };

  return (
    <div className="create-item-creat-item-modal-overlay">
      <div className="create-item-modal-box">
        <form className="create-item-form" onSubmit={handleSubmit}>
          <h2>Create New Item</h2>

          <div className="create-item-create-item-form">
            <input
              type="text"
              name="name"
              placeholder="Item Name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>

          <div className="create-item-form-group">
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Books">Books</option>
              <option value="Clothes">Clothes</option>
              <option value="Toys">Toys</option>
              <option value="Food">Food</option>
              <option value="Other">Other</option>
            </select>
            {errors.category && <p className="error">{errors.category}</p>}
          </div>

          <div className="create-item-form-group">
            <textarea
              name="description"
              placeholder="Item Description"
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && (
              <p className="error">{errors.description}</p>
            )}
          </div>

          <div className="create-item-form-group">
            <input
              type="text"
              name="address"
              placeholder="Address (e.g., Howrah Station)"
              value={formData.address}
              onChange={handleChange}
            />
            {errors.address && <p className="error">{errors.address}</p>}
          </div>

          <div className="create-item-form-group">
            <input
              type="text"
              name="coordinates"
              placeholder="Coordinates (auto-filled)"
              value={formData.coordinates}
              readOnly
            />
          </div>

          <div className="create-item-modal-buttons">
            <button type="submit" className="create-item-submit-btn">
              Submit
            </button>
          <button type="button" className="create-item-cancel-btn" onClick={handleCancel}>
  Cancel
</button>
          </div>
        </form>
      </div>
    </div>
  );
}
