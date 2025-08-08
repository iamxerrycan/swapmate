import React, { useEffect, useState } from 'react';
import API from '../../../utils/api/axiosInstance';
import './ManageSwap.css';

const ManageSwap = () => {
  const [swaps, setSwaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log('swaps', swaps);

  const fetchSwaps = async () => {
    console.log('Fetching swaps...');
    setLoading(true);
    try {
      const { data } = await API.get('/api/swaps/my');
      console.log('Received data:', data);
      setSwaps(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSwaps();
  }, []);

  const handleAction = async (id, action) => {
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
    }
  };

  const currentUserId = localStorage.getItem('userId');

  if (loading) return <p className="loading-text">Loading swaps...</p>;
  if (error) return <p className="error-text">Error: {error}</p>;

  // Replace these links with your actual routes
  const cardLinks = [
    {
      title: 'Dashboard',
      description: 'Go to main dashboard',
      url: '/dashboard',
    },
    {
      title: 'Manage Swaps',
      description: 'Create, update, cancel swaps',
      url: '/dashboard/manageswap',
    },
    {
      title: 'All Swaps',
      description: 'View all swaps (admin)',
      url: '/dashboard/allswaps',
    },
  ];

  return (
    <div className="manage-swap-wrapper">
      <h1 className="page-title">Manage Swaps</h1>

      <div className="card-grid">
        {cardLinks.map(({ title, description, url }) => (
          <a key={title} href={url} className="dashboard-card">
            <h3>{title}</h3>
            <p>{description}</p>
          </a>
        ))}
      </div>

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
                  <td>{swap.fromUser?.name || 'N/A'}</td>
                  <td>{swap.toUser?.name || 'N/A'}</td>
                  <td>{swap.fromItem?.name || '-'}</td>
                  <td>{swap.toItem?.name || '-'}</td>
                  <td>{swap.message || '-'}</td>
                  <td className={`status status-${swap.status.toLowerCase()}`}>
                    {swap.status}
                  </td>
                  <td className="actions">
                    {swap.status === 'Pending' && (
                      <>
                        <button
                          className="btn accept"
                          onClick={() => handleAction(swap._id, 'accept')}
                        >
                          Accept
                        </button>
                        <button
                          className="btn reject"
                          onClick={() => handleAction(swap._id, 'reject')}
                        >
                          Reject
                        </button>
                        {swap.fromUser?._id === currentUserId && (
                          <button
                            className="btn cancel"
                            onClick={() => handleAction(swap._id, 'cancel')}
                          >
                            Cancel
                          </button>
                        )}
                      </>
                    )}
                    <button
                      className="btn delete"
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
