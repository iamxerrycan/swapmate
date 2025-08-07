// src/pages/dashboard/items/CreateItemPage.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createItem } from '../../../features/item/itemSlice';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../../components/ui/Spinner';
import Loader from '../../../components/ui/Loader';

export default function CreateItemPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.item);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    image: null,
  });

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
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('category', formData.category);
    if (formData.image) data.append('image', formData.image);

    await dispatch(createItem(data));
    navigate('/dashboard/items');
  };

  if (loading) return <Loader fullHeight={true} />;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create New Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          required
        ></textarea>
        <input
          type="text"
          name="category"
          placeholder="Category"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="image"
          className="w-full"
          accept="image/*"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create
        </button>
      </form>
    </div>
  );
}
