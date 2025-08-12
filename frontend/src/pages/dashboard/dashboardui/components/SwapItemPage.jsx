import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchItemById } from '../../../../features/items/itemSlice';
import { createSwap } from '../../../../features/swap/swapSlice';
import './SwapItempage.css';
import Spinner from '../../../../components/ui/Spinner';
import { FaExchangeAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Loader from '../../../../components/ui/Loader';
import useNotifications from '../../../../hooks/useNotifications';
import { ImageOff } from 'lucide-react';

export default function SwapItemPage() {
  const { itemId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { createNotification } = useNotifications(); // ✅ fixed name

  const [selectedUserItemId, setSelectedUserItemId] = useState('');
  const { selectedItem, isLoading, items } = useSelector(
    (state) => state.items
  );
  const { user } = useSelector((state) => state.auth);
  const { creatingSwap, swapError } = useSelector((state) => state.swaps);

  useEffect(() => {
    if (itemId) {
      dispatch(fetchItemById(itemId));
    }
  }, [itemId, dispatch]);

  // Items owned by logged-in user
  const userItems = items.filter(
    (item) => item.user?._id?.toString() === user?.user?._id?.toString()
  );

  const handleRequestSwap = async () => {
    if (!selectedUserItemId) {
      toast.error('Please select one of your items to swap');
      return;
    }

    const payload = {
      fromUser: user._id || user?.user._id,
      toUser:
        typeof selectedItem.user === 'object'
          ? selectedItem.user._id
          : selectedItem.user,
      fromItem: selectedUserItemId,
      toItem: selectedItem._id,
      status: 'Pending',
    };

    try {
      const createdSwap = await dispatch(createSwap(payload)).unwrap();

      // Get the selected user item name
      const senderItem = userItems.find(
        (item) => item._id === selectedUserItemId
      );

      // Create a personalized message
      const message = `${user?.user?.name || user?.name} wants to swap their "${
        senderItem?.name
      }" for your "${selectedItem.name}".`;

      // Notify the other user
      await createNotification({
        sender: payload.fromUser,
        receiver: payload.toUser,
        message,
        type: 'swap_request',
        relatedItem: selectedItem._id,
        relatedSwap: createdSwap._id,
        actionURL: `/dashboard/swaps/${createdSwap._id}`,
      });

      toast.success('Swap request sent successfully');
      navigate('/dashboard/swapitem');
    } catch (err) {
      toast.error('Failed to send swap request');
      console.error('Error sending swap request:', err);
    }
  };

  if (isLoading || !selectedItem) {
    return <Loader fullHeight={true} />;
  }

  return (
    <div className="swap-page-container">
      <h2 className="swap-title">
        <FaExchangeAlt style={{ marginRight: '10px' }} />
        Swap This Item
      </h2>

      <div className="swap-item-details">
        {selectedItem.image ? (
          <img
            src={selectedItem.image}
            alt={selectedItem.name || 'Item Image'}
            className="item-card-image"
          />
        ) : (
          <div className="item-card-noimage">
            <ImageOff size={48} color="#999" />
          </div>
        )}
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
          {creatingSwap ? <Spinner /> : 'Send Swap Request'}
        </button>

        {swapError && <p className="error-msg">{swapError}</p>}
      </div>
    </div>
  );
}
