import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUserItems,
  deleteItem,
} from '../../../../features/items/itemSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './ManageItems.css';
import { confirmToast } from '../../../../components/ui/ConfirmToast';
import Loader from '../../../../components/ui/Loader';

export default function ManageItems() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading } = useSelector((state) => state.items);

  useEffect(() => {
    dispatch(fetchUserItems());
  }, [dispatch]);

  const handleEdit = (id) => {
    navigate(`/dashboard/edit/${id}`);
  };

  const handleDelete = async (id) => {
    confirmToast(async () => {
      try {
        await dispatch(deleteItem(id)).unwrap();
        toast.success('Item deleted successfully');
        dispatch(fetchUserItems());
      } catch (err) {
        console.error(err);
        toast.error('Failed to delete item');
      }
    });
  };

  return (
    <div className="manage-items-container">
      <h2 className="manage-title">Manage Your Items</h2>

      {loading ? (
        <Loader fullHeight={true} />
      ) : items.length === 0 ? (
        <div className="no-items">
          <p>No items found</p>
          <button
            onClick={() => navigate('/dashboard/create')}
            className="create-btn"
          >
            Create New Item
          </button>
        </div>
      ) : (
        <div className="items-grid">
          {items.map((item) => (
            <div className="item-card" key={item._id}>
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name || 'Item image'}
                  className="item-image"
                />
              ) : (
                <div className="no-image">No Image Available</div>
              )}
              <h3>{item.name}</h3>
              <p className="category">{item.category}</p>
              <p className="description">{item.description}</p>

              <div className="card-actions">
                <button
                  onClick={() => handleEdit(item._id)}
                  className="edit-btn"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
