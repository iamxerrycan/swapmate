export default function FilterBox({ onFilter }) {
  return (
    <select
      onChange={(e) => onFilter(e.target.value)}
      style={{
        padding: "8px",
        marginBottom: "1rem",
        width: "100%",
        maxWidth: "200px",
      }}
    >
      <option value="">All Categories</option>
      <option value="Electronics">Electronics</option>
      <option value="Books">Books</option>
      <option value="Clothes">Clothes</option>
      <option value="Furniture">Furniture</option>
    </select>
  );
}
