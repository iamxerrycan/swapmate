import React, { useEffect, useState } from 'react';
import './DashboardHeader.css';
import { FaUserCircle } from 'react-icons/fa';
import API from '../../../utils/api/axiosInstance';
import { useNavigate } from 'react-router-dom';

const DashboardHeader = () => {
  const [me, setMe] = useState(null);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  // Get logged-in user
  useEffect(() => {
    API.get('/api/user/me')
      .then(res => setMe(res.data))
      .catch(() => {});
  }, []);

  // Search users with debounce
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const delay = setTimeout(() => {
      API.get(`/api/user/search?q=${encodeURIComponent(query)}`)
        .then(res => setResults(res.data))
        .catch(() => setResults([]));
    }, 300);
    return () => clearTimeout(delay);
  }, [query]);

  return (
    <header className="dashboard-header">
      <div className="dashboard-right">
        {/* Search */}
        <div className="search-container">
          <input
            type="text"
            placeholder="🔍 Search users..."
            className="dashboard-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {results.length > 0 && (
            <div className="search-dropdown">
              {results.map(user => (
                <div
                  key={user._id}
                  className="search-item"
                  onClick={() => {
                    navigate(`/user/${user._id}`);
                    setResults([]);
                    setQuery('');
                  }}
                >
                  {/* <img
                    src={user.avatar || '/default-avatar.png'}
                    alt={user.username}
                    className="search-avatar"
                  /> */}
                  <FaUserCircle className="profile-icon-dashboard" />
                  <span>{user.username || user?.user?.name || user?.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="dashboard-avatar">
          {me?.avatar ? (
            <img src={me.avatar} alt="Profile" className="profile-avatar" />
          ) : (
            <FaUserCircle className="profile-icon-dashboard" />
          )}
          {me && <span className="username">{me.username}</span>}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
