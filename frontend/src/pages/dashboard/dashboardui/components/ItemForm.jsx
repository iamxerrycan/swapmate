// src/components/forms/ItemForm.jsx
import React from 'react';
import './ItemForm.css';

export default function ItemForm({
  formData,
  errors,
  handleChange,
  handleSubmit,
  onClose,
  isEditMode,
}) {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <form className="create-item-form" onSubmit={handleSubmit}>
          <h2>{isEditMode ? 'Edit Item' : 'Create New Item'}</h2>

          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Item Name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>

          <div className="form-group">
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

          <div className="form-group">
            <textarea
              name="description"
              placeholder="Item Description"
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && <p className="error">{errors.description}</p>}
          </div>

          <div className="form-group">
            <input
              type="text"
              name="address"
              placeholder="Address (e.g., Howrah Station)"
              value={formData.address}
              onChange={handleChange}
            />
            {errors.address && <p className="error">{errors.address}</p>}
          </div>

          <div className="form-group">
            <input
              type="text"
              name="coordinates"
              placeholder="Coordinates (auto-filled)"
              value={formData.coordinates}
              readOnly
            />
          </div>

          <div className="modal-buttons">
            <button type="submit" className="submit-btn">
              {isEditMode ? 'Update Item' : 'Submit'}
            </button>
            {onClose && (
              <button type="button" className="cancel-btn" onClick={onClose}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
