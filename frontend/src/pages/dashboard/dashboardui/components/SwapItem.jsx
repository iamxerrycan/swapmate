import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '../../../../features/items/itemSlice';
import ItemCardMini from './ItemCardMini';
import SearchBar from '../../../../components/ui/SearchBar';
import FilterBox from '../../../../components/ui/FilterBox';
import './SwapItem.css';
import Loader from '../../../../components/ui/Loader';

export default function SwapItem() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.items);
  const { user } = useSelector((state) => state.auth);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  console.log('User item id :', items.user?._id);

  console.log('user ID', user.user?._id);
  console.log('items swap', items);

  useEffect(() => {
    let query = '';
    if (category) query += `?category=${category}`;
    dispatch(fetchItems(query));
  }, [dispatch, category]);

  // Get user location for nearest
  useEffect(() => {
    if (sortBy === 'nearest' && !userLocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Geolocation error:', error);
        }
      );
    }
  }, [sortBy, userLocation]);

  // Haversine formula
  const getDistance = (lat1, lon1, lat2, lon2) => {
    function toRad(x) {
      return (x * Math.PI) / 180;
    }

    const R = 6371; // km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Main filtered and sorted array
  const filteredItems = items
    // .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
    .filter((item) => {
      const isNotOwnItem = item?.user?._id !== user?.user?._id;
      const matchesSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());
      return isNotOwnItem && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (sortBy === 'oldest') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      if (sortBy === 'nearest' && userLocation) {
        const [lngA, latA] = a.location.coordinates;
        const [lngB, latB] = b.location.coordinates;
        const distA = getDistance(
          userLocation.latitude,
          userLocation.longitude,
          latA,
          lngA
        );
        const distB = getDistance(
          userLocation.latitude,
          userLocation.longitude,
          latB,
          lngB
        );
        return distA - distB;
      }
      return 0;
    });

  return (
    <div className="swap-container">
      <div className="swap-header">
        <h2 className="swap-title">
          Total Swap Items ({filteredItems.length})
        </h2>
      </div>

      <div className="swap-controls">
        <div className="swap-control-group">
          <SearchBar onSearch={setSearch} />
        </div>

        <div className="swap-control-group">
          <FilterBox onFilter={setCategory} />
        </div>

        <div className="swap-control-group">
          <select
            className="swap-sort-select"
            onChange={(e) => setSortBy(e.target.value)}
            value={sortBy}
          >
            <option value="">Sort By</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="nearest">Nearest</option>
          </select>
        </div>
      </div>

      <div className="swap-items-grid">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <ItemCardMini key={item._id} item={item} />
          ))
        ) : (
          <Loader fullHeight={true} />
        )}
      </div>
    </div>
  );
}
