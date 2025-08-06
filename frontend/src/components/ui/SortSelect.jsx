import React from 'react';

const SortSelect = ({ sortBy, setSortBy }) => {
  return (
    <div className="sort-select-container">
      <label htmlFor="sort" className="sort-label">Sort By:</label>
      <select
        id="sort"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="sort-select"
      >
        <option value="coordinate">Coordinate</option>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>
    </div>
  );
};

export default SortSelect;
