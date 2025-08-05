// src/pages/dashboard/items/UpdateItemPage.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getItemById, updateItem } from '../../../features/item/itemSlice';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../../../components/ui/Spinner';

export default function UpdateItemPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { item, loading } = useSelector((state) => state.item);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    image: null,
  });

  useEffect(() => {
    dispatch(getItemById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (item) {
      setFormData({
        title: item.title,
        description: item.description,
        category: item.category,
        image: null,
      });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = new FormData();
    updatedData.append('title', formData.title);
    updatedData.append('description', formData.description);
    updatedData.append('category', formData.category);
    if (formData.image) updatedData.append('image', formData.image);

    await dispatch(updateItem({ id, data: updatedData }));
    navigate('/dashboard/items');
  };

  if (loading) return <Spinner />;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Update Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Title"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Description"
          required
        />
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Category"
          required
        />
        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="w-full"
          accept="image/*"
        />
        <button
          type="submit"
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Update
        </button>
      </form>
    </div>
  );
}
