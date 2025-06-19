export default function SearchBar({ onSearch }) {
  return (
    <input
      type="text"
      placeholder="Search items..."
      onChange={(e) => onSearch(e.target.value)}
      style={{
        padding: "8px",
        width: "100%",
        maxWidth: "400px",
        marginBottom: "1rem",
      }}
    />
  );
}
