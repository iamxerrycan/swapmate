import './FilterBox.css'; // Create this file

export default function FilterBox({ onFilter }) {
  return (
    <select className="filter-box" onChange={(e) => onFilter(e.target.value)}>
      <option value="">All Categories</option>
      <option value="Electronics">Electronics</option>
      <option value="Books">Books</option>
      <option value="Clothes">Clothes</option>
      <option value="Furniture">Furniture</option>
      <option value="Other">Other</option>
    </select>
  );
}
