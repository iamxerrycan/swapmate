import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { confirmToast } from '../components/ui/ConfirmToast';
import {
  fetchItemById,
  updateItem,
  deleteItem,
} from '../features/items/itemSlice';
import { toast } from 'react-toastify';
import './CreateItem.css';

export default function EditItem() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedItem } = useSelector((state) => state.items);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    address: '',
    coordinates: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchItemById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedItem) {
      const coords = selectedItem.location?.coordinates || [];
      setFormData({
        name: selectedItem.name || '',
        category: selectedItem.category || '',
        description: selectedItem.description || '',
        address: selectedItem.address || '',
        coordinates: coords.length ? `${coords[0]},${coords[1]}` : '',
      });
    }
  }, [selectedItem]);

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

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.category) errs.category = 'Category is required';
    if (!formData.description.trim())
      errs.description = 'Description is required';
    if (!formData.address.trim()) errs.address = 'Address is required';
    return errs;
  };

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

      const updatedItem = {
        name: formData.name,
        category: formData.category,
        description: formData.description,
        address: formData.address,
        coordinates: [lng, lat],
      };

      await dispatch(updateItem({ id, itemData: updatedItem })).unwrap();
      toast.success('Item updated successfully');
      navigate('/profile');
    } catch (err) {
      console.error('Update failed:', err);
      toast.error('Failed to update item');
    }
  };

  const handleDelete = async () => {
    // if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      await dispatch(deleteItem(id)).unwrap();
      toast.success('Item deleted successfully');
      navigate('/profile');
    } catch (err) {
      console.error('Delete failed:', err);
      toast.error('Failed to delete item');
    }
  };

  const handleClick = () => {
  confirmToast(handleDelete);
};

  return (
    <form className="create-item-form" onSubmit={handleSubmit}>
      <h2>Edit Item</h2>

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
          placeholder="Coordinates"
          value={formData.coordinates}
          onChange={handleChange}
        />
      </div>

      <div className="two-buttons">
        <div className="three-buttons">
          <button type="submit">Update</button>
          <button type="button" onClick={() => navigate('/profile')}>
            Cancel
          </button>
          <button
            type="button"
            className="delete-button"
            onClick={handleClick}
            style={{ backgroundColor: 'red', color: 'white' }}
          >
            Delete
          </button>
        </div>
      </div>
    </form>
  );
}


