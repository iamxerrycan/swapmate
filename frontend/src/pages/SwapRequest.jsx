import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import API from '../utils/axiosInstance';
import './SwapItem.css';

export default function SwapItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSwapRequest = async () => {
    try {
      const res = await API.post(`/api/swaps/request`, {
        itemId: id,
        requesterId: user?.user?._id,
      });

      setSuccess(res.data.message || 'Swap request sent successfully!');
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Swap request failed.');
      setSuccess('');
    }
  };

  return (
    <div className="swap-item-page">
      <h2>Swap Request for Item - {id}</h2>

      <textarea
        placeholder="Optional message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={4}
      ></textarea>

      <button onClick={handleSwapRequest} className="swap-request-btn">
        🔁 Send Swap Request
      </button>

      {success && <p className="success-text">{success}</p>}
      {error && <p className="error-text">{error}</p>}
      <button onClick={() => navigate(-1)} className="back-btn">← Back</button>
    </div>
  );
}
