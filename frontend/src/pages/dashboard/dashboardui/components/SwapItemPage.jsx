import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchItemById } from '../../../../features/items/itemSlice';
import { createSwap } from '../../../../features/swap/swapSlice';
import './SwapItempage.css';
import ButtonLoader from '../../../../components/ui/ButtonLoader';
import { FaExchangeAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Loader from '../../../../components/ui/Loader';

export default function SwapItemPage() {
  const { itemId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedUserItemId, setSelectedUserItemId] = useState('');
  const { selectedItem, isLoading } = useSelector((state) => state.items);
  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.items); // All items from redux
  const { creatingSwap, swapError } = useSelector((state) => state.swaps);

  // console.log('selectedItem:', selectedItem);
  // console.log('selectedUserItemId:', selectedUserItemId);
  // console.log('items:', items);
  // console.log('user:', user);

  useEffect(() => {
    if (itemId) {
      dispatch(fetchItemById(itemId));
    }
  }, [itemId, dispatch]);

  const userItems = items.filter(
    (item) => item.user === user.user._id || item.user?._id === user.user._id
  );

  const handleRequestSwap = async () => {
    const payload = {
      fromUser: user.user._id,
      toUser:
        typeof selectedItem.user === 'object'
          ? selectedItem.user._id
          : selectedItem.user,
      fromItem: selectedUserItemId,
      toItem: selectedItem._id,
      status: 'Pending',
    };

    console.log('Payload being sent:', payload);

    try {
      await dispatch(createSwap(payload)).unwrap();
      toast.success('Swap request sent successfully');
      navigate('/dashboard/swapitem');
    } catch (err) {
      toast.error('Failed to send swap request');
      console.error('Error sending swap request:', err);
    }
  };

  if (isLoading) {
    return (
      <Loader fullHeight={true} />
    );
  }

  return (
    <div className="swap-page-container">
      <h2 className="swap-title">
        <FaExchangeAlt style={{ marginRight: '10px' }} />
        Swap This Item
      </h2>

      <div className="swap-item-details">
        <img
          src={selectedItem.image || '/placeholder.png'}
          alt={selectedItem.name}
          className="swap-item-image"
        />
        <div className="swap-item-info">
          <h3>{selectedItem.name}</h3>
          <p>
            <strong>Category:</strong> {selectedItem.category}
          </p>
          <p>
            <strong>Condition:</strong> {selectedItem.condition}
          </p>
          <p>
            <strong>Location:</strong> {selectedItem.address}
          </p>
          <p>
            <strong>Description:</strong> {selectedItem.description}
          </p>
        </div>
      </div>

      <div className="swap-actions">
        <label htmlFor="userItemSelect">Select your item to swap:</label>
        <select
          id="userItemSelect"
          value={selectedUserItemId}
          onChange={(e) => setSelectedUserItemId(e.target.value)}
        >
          <option value="">-- Choose your item --</option>
          {userItems.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name} ({item.category})
            </option>
          ))}
        </select>

        <button
          onClick={handleRequestSwap}
          className="swap-request-button"
          disabled={creatingSwap}
        >
          {creatingSwap ? <ButtonLoader /> : 'Send Swap Request'}
        </button>

        {swapError && <p className="error-msg">{swapError}</p>}
      </div>
    </div>
  );
}
