import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '../features/items/itemSlice';
import ItemCard from '../components/ui/ItemCard';
import SearchBar from '../components/ui/SearchBar';
import FilterBox from '../components/ui/FilterBox';
import './Home.css';
import Loader from '../components/ui/Loader';

export default function Home() {
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
    <div className="home-container">
      <h2 className="home-title">🛍️ Explore Our Collection</h2>

     <div className="controls">
  <div className="search-wrapper">
    <SearchBar onSearch={setSearch} />
  </div>
  <div className="filter-wrapper">
    <FilterBox onFilter={setCategory} />
  </div>
</div>


      {loading && <Loader fullHeight={true} />}
      {error && <p className="error">⚠️ {error}</p>}

      <div className="items-grid">
        {filteredItems.length === 0 ? (
          <p className="no-items">🚫 No items found.</p>
        ) : (
          filteredItems.map((item) => <ItemCard key={item._id} item={item} />)
        )}
      </div>
    </div>
  );
}
