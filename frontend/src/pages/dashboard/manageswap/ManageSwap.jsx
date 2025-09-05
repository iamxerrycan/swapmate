import React, { useEffect, useState } from 'react';
import API from '../../../utils/api/axiosInstance';
import './ManageSwap.css';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../components/ui/Loader';

const ManageSwap = () => {
  const [swaps, setSwaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const currentUserId = localStorage.getItem('userId');
  const navigate = useNavigate();


  // Fetch swaps for the logged in user
  const fetchSwaps = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/api/swaps/my');
      setSwaps(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSwaps();
  }, []);

  // Handle accept/reject/cancel/delete actions on swaps
  // const handleAction = async (id, action) => {
  //   setActionLoadingId(id);
  //   let method = 'put';
  //   let url = `/api/swaps/${id}/${action}`;
  //   if (action === 'delete') {
  //     method = 'delete';
  //     url = `/api/swaps/${id}`;
  //   }
  //   try {
  //     await API({ method, url });
  //     fetchSwaps();
  //   } catch (err) {
  //     alert(err.response?.data?.error || err.message);
  //   } finally {
  //     setActionLoadingId(null);
  //   }
  // };

  const handleAction = async (id, action) => {
    setActionLoadingId(id);
    let method = 'put';
    let url = `/api/swaps/${id}/${action}`;
    if (action === 'delete') {
      method = 'delete';
      url = `/api/swaps/${id}`;
    }
    if (action === 'swapped') {
      method = 'put';
      url = `/api/swaps/${id}/swapped`;
    }
    if (action === 'complete') {
      method = 'put';
      url = `/api/swaps/${id}/complete`;
    }
    try {
      await API({ method, url });
      fetchSwaps();
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    } finally {
      setActionLoadingId(null);
    }
  };

  // Start or get existing chat for a swap and navigate to chat page
  const handleOpenChat = async (swap) => {
    try {
      const { data: chat } = await API.post('/api/chat/start', {
        fromUserId: swap.fromUser._id,
        toUserId: swap.toUser._id,
        swapId: swap._id,
      });

      const otherUser = chat.participants.find((p) => p._id !== currentUserId);

      navigate(`/dashboard/chat/${chat._id}`, {
        state: {
          swapId: chat.swapId,
          participants: chat.participants,
          otherUser, // Add this line
        },
      });
    } catch (err) {
      alert(
        'Failed to open chat: ' + (err.response?.data?.error || err.message)
      );
    }
  };

  if (loading) return <Loader fullHeight={true} />;
  if (error) return <p className="error-text">Error: {error}</p>;

  return (
    <div className="manage-swap-wrapper">
      <h1 className="page-title">Manage Swaps</h1>

      <section className="swap-table-section">
        {swaps.length === 0 ? (
          <p>No swap requests found.</p>
        ) : (
          <table className="swap-table">
            <thead>
              <tr>
                <th>From User</th>
                <th>To User</th>
                <th>From Item</th>
                <th>To Item</th>
                <th>Message</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {swaps.map((swap) => (
                <tr key={swap._id}>
                  <td data-label="From User">{swap.fromUser?.name || 'N/A'}</td>
                  <td data-label="To User">{swap.toUser?.name || 'N/A'}</td>
                  <td data-label="From Item">{swap.fromItem?.name || '-'}</td>
                  <td data-label="To Item">{swap.toItem?.name || '-'}</td>
                  <td data-label="Message">{swap.message || '-'}</td>

                  <td
                    data-label="Status"
                    className={`status status-${swap.status.toLowerCase()}`}
                  >
                    {swap.status}
                  </td>

                  <td className="actions">
                    {swap.status === 'Pending' && (
                      <>
                        <button
                          className="btn accept"
                          disabled={actionLoadingId === swap._id}
                          onClick={() => handleAction(swap._id, 'accept')}
                        >
                          Accept
                        </button>
                        <button
                          className="btn reject"
                          disabled={actionLoadingId === swap._id}
                          onClick={() => handleAction(swap._id, 'reject')}
                        >
                          Reject
                        </button>
                        {swap.fromUser?._id?.toString() === currentUserId && (
                          <button
                            className="btn cancel"
                            disabled={actionLoadingId === swap._id}
                            onClick={() => handleAction(swap._id, 'cancel')}
                          >
                            Cancel
                          </button>
                        )}
                      </>
                    )}
                    {swap.status === 'Accepted' ? (
                      <>
                        <button
                          className="btn chat"
                          onClick={() => handleOpenChat(swap)}
                        >
                          Chat
                        </button>
                        <button
                          className="btn swapped"
                          disabled={actionLoadingId === swap._id}
                          onClick={() => handleAction(swap._id, 'swapped')}
                        >
                          Swapped
                        </button>

                        <button
                          className="btn fulfilled"
                          disabled={actionLoadingId === swap._id}
                          onClick={() => handleAction(swap._id, 'complete')}
                        >
                          Fulfilled
                        </button>
                      </>
                    ) : (
                      <button
                        className="btn delete"
                        disabled={actionLoadingId === swap._id}
                        onClick={() => handleAction(swap._id, 'delete')}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
};

export default ManageSwap;

