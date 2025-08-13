// src/hooks/useSwaps.js
import { useState, useEffect } from 'react';
import API from '../utils/api/axiosInstance';

export const useSwaps = () => {
  const [swaps, setSwaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    let method = 'put';
    let url = `/api/swaps/${id}/${action}`;
    if (action === 'delete') {
      method = 'delete';
      url = `/api/swaps/${id}`;
    }

    await API({ method, url });
    await fetchSwaps();
  };

  return { swaps, loading, error, handleAction };
};
