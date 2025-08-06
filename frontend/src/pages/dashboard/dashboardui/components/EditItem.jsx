import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchItemById, updateItem } from '../../../../features/items/itemSlice';
import { useParams, useNavigate } from 'react-router-dom';
import ItemForm from './ItemForm';
import { toast } from 'react-toastify';

const EditItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    address: '',
    coordinates: '',
  });

  const [errors, setErrors] = useState({});

 useEffect(() => {
  (async () => {
    try {
      const res = await dispatch(fetchItemById(id)).unwrap();

      let coordinatesStr = '';
      if (Array.isArray(res.coordinates) && res.coordinates.length === 2) {
        coordinatesStr = `${res.coordinates[0]},${res.coordinates[1]}`;
      } else if ('geolocation' in navigator) {
        // fallback to current location
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const { longitude, latitude } = pos.coords;
            setFormData({
              name: res.name || '',
              category: res.category || '',
              description: res.description || '',
              address: res.address || '',
              coordinates: `${longitude},${latitude}`,
            });
          },
          () => {
            toast.error('Coordinates missing and location access denied.');
            setFormData({
              name: res.name || '',
              category: res.category || '',
              description: res.description || '',
              address: res.address || '',
              coordinates: '',
            });
          }
        );
        return; // prevent double `setFormData` call
      }

      // default setFormData (no geolocation fallback)
      setFormData({
        name: res.name || '',
        category: res.category || '',
        description: res.description || '',
        address: res.address || '',
        coordinates: coordinatesStr,
      });
    } catch {
      toast.error('Failed to load item');
    }
  })();
}, [dispatch, id]);


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
    if (!formData.description.trim()) errs.description = 'Description is required';
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

      const updatedData = {
        ...formData,
        coordinates: [lng, lat],
      };

    await dispatch(updateItem({ id, itemData: updatedData })).unwrap();
      toast.success('Item updated successfully');
      navigate('/dashboard/manage');
    } catch {
      toast.error('Failed to update item');
    }
  };

  const handleClose = () => {
    navigate('/dashboard/manage');
  };

  return (
    <ItemForm
      formData={formData}
      errors={errors}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      onClose={handleClose}
      isEditMode={true}
    />
  );
};

export default EditItem;
