// import { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { createItem } from '../features/items/itemSlice';
// import { useNavigate } from 'react-router-dom';
// import './CreateItem.css';

// export default function CreateItem() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: '',
//     category: '',
//     description: '',
//     address: '',
//     coordinates: '', // Will be auto-filled
//   });

//   // 📍 Auto-detect location when component mounts
//   useEffect(() => {
//     if ('geolocation' in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           const { longitude, latitude } = pos.coords;
//           setFormData((prev) => ({
//             ...prev,
//             coordinates: `${longitude},${latitude}`,
//           }));
//         },
//         (err) => {
//           console.error('Geolocation error:', err);
//           alert('Unable to fetch location. Please allow location access.');
//         }
//       );
//     } else {
//       alert('Geolocation is not supported by your browser.');
//     }
//   }, []);

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const [lng, lat] = formData.coordinates
//         .split(',')
//         .map((value) => parseFloat(value.trim()));

//       const newItem = {
//         name: formData.name,
//         category: formData.category,
//         description: formData.description,
//         address: formData.address,
//         coordinates: [lng, lat],
//       };

//       console.log('Submitting item:', newItem);
//       await dispatch(createItem(newItem)).unwrap();
//       navigate('/profile');
//     } catch (err) {
//       console.error('Create item failed:', err);
//       alert('Failed to create item');
//     }
//   };

//   return (
//     <form className="create-item-form" onSubmit={handleSubmit}>
//       <h2>Create New Item</h2>

//       <input
//         type="text"
//         name="name"
//         placeholder="Item Name"
//         value={formData.name}
//         onChange={handleChange}
//         required
//       />

//       <select
//         name="category"
//         value={formData.category}
//         onChange={handleChange}
//         required
//         //Books', 'Electronics', 'Clothes', 'Toys', 'Food', 'Other
//       >
//         <option value="">Select Category</option>
//         <option value="Electronics">Electronics</option>
//         <option value="Books">Books</option>
//         <option value="Clothes">Clothes</option>
//         <option value="Toys">Toys</option>
//         <option value="Food">Food</option>
//         <option value="Other">Other</option>
//       </select>

//       <textarea
//         name="description"
//         placeholder="Item Description"
//         value={formData.description}
//         onChange={handleChange}
//         required
//       />

//       <input
//         type="text"
//         name="address"
//         placeholder="Address (e.g., Howrah Station)"
//         value={formData.address}
//         onChange={handleChange}
//         required
//       />

//       {/* Hidden or optional input to show auto-detected coordinates */}
//       <input
//         type="text"
//         name="coordinates"
//         placeholder="Coordinates (auto-filled)"
//         value={formData.coordinates}
//         readOnly
//       />

//       <button type="submit">Submit</button>
//     </form>
//   );
// }

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createItem } from '../features/items/itemSlice';
import { useNavigate } from 'react-router-dom';
import './CreateItem.css';
import { toast } from 'react-toastify';

export default function CreateItem() {
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
          alert('Location access denied.');
        }
      );
    } else {
      alert('Geolocation not supported by browser.');
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
      navigate('/profile');
    } catch (err) {
      console.error('Create item failed:', err);
      toast.error('Failed to create item');
    }
  };

  return (
    <form className="create-item-form" onSubmit={handleSubmit}>
      <div className="form-wrap">
        <h2>Create New Item</h2>

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

        <div className="two-buttons">
          <button type="submit">Submit</button>
          <button type="button" onClick={() => navigate('/profile')}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
