// src/pages/dashboard/items/ItemsPage.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllItems } from '../../../features/item/itemSlice';
import Spinner from '../../../components/ui/Spinner';
import Loader from '../../../components/ui/Loader';

export default function ItemsPage() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.item);

  useEffect(() => {
    dispatch(getAllItems());
  }, [dispatch]);

  if (loading) return <Loader fullHeight={true} />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Items</h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4">Title</th>
              <th className="py-2 px-4">Description</th>
              <th className="py-2 px-4">Category</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id} className="border-t">
                <td className="py-2 px-4">{item.title}</td>
                <td className="py-2 px-4">{item.description}</td>
                <td className="py-2 px-4">{item.category}</td>
                <td className="py-2 px-4">
                  <button className="text-blue-600 mr-2 hover:underline">Edit</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
