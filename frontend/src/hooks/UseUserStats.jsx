import { useEffect, useState } from 'react';
import API from '../utils/api/axiosInstance';

export default function useUserStats() {
  const [stats, setStats] = useState({
    listed: 0,
    swapped: 0,
    pending: 0,
    rejected: 0,
    accepted: 0,
    fulfilled: 0,
    cancelled: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true; // to prevent state updates after unmount

    const fetchStats = async () => {
      try {
        const res = await API.get('/api/user/stats');
        if (isMounted) {
          setStats(res.data);
          setError('');
        }
      } catch (err) {
        console.error('Failed to load stats:', err);
        if (isMounted) {
          setError('Could not fetch stats');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchStats();

    return () => {
      isMounted = false; // cleanup
    };
  }, []);

  return { stats, loading, error };
}
