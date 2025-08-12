import React, { useEffect, useState } from 'react';
import API from '../../../utils/api/axiosInstance';
import './ManageSwap.css';

const ManageSwap = () => {
  const [swaps, setSwaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const currentUserId = localStorage.getItem('userId');

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

  const handleAction = async (id, action) => {
    setActionLoadingId(id);
    let method = 'put';
    let url = `/api/swaps/${id}/${action}`;
    if (action === 'delete') {
      method = 'delete';
      url = `/api/swaps/${id}`;
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

  if (loading) return <p className="loading-text">Loading swaps...</p>;
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
                  <td data-label="Status" className={`status status-${swap.status.toLowerCase()}`}>
                    {swap.status}
                  </td>
                  <td data-label="Actions" className="actions">
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
                    <button
                      className="btn delete"
                      disabled={actionLoadingId === swap._id}
                      onClick={() => handleAction(swap._id, 'delete')}
                    >
                      Delete
                    </button>
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
