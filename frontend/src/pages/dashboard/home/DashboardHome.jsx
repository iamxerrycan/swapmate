// src/pages/dashboard/DashboardHome.jsx

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '../../../features/items/itemSlice';
import ItemCard from '../../../components/ui/ItemCard';
import SearchBar from '../../../components/ui/SearchBar';
import FilterBox from '../../../components/ui/FilterBox';
import './DashboardHome.css'; // Create this file for styling

export default function DashboardHome() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.items);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    let query = '';
    if (category) query = `?category=${category}`;
    dispatch(fetchItems(query));
  }, [dispatch, category]);

  const filteredItems =
    search.trim() === ''
      ? items
      : items.filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        );

  return (
    <div className="dashboard-home-container">
      <h1 className="dashboard-home-title">🛍️ Explore Your Items</h1>

      <div className="dashboard-controls">
        <SearchBar onSearch={setSearch} />
        <FilterBox onFilter={setCategory} />
      </div>

      {loading && <p className="loading">⏳ Loading items...</p>}
      {error && <p className="error">⚠️ {error}</p>}

      <div className="dashboard-items-grid">
        {filteredItems.length === 0 ? (
          <p className="no-items">🚫 No items found.</p>
        ) : (
          filteredItems.map((item) => <ItemCard key={item._id} item={item} />)
        )}
      </div>
    </div>
  );
}

