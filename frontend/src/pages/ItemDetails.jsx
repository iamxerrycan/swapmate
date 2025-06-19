import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import API from "../utils/axiosInstance"; 

export default function ItemDetails() {
  const { id } = useParams();
  const { items } = useSelector((state) => state.items);

  const [item, setItem] = useState(null);
  const [error, setError] = useState("");

  // Try to get item from Redux store first
  useEffect(() => {
    const foundItem = items.find((i) => i._id === id);
    if (foundItem) {
      setItem(foundItem);
    } else {
      // Fallback: fetch from API
      const fetchItem = async () => {
        try {
          const res = await API.get(`/api/items/${id}`);
          setItem(res.data);
        } catch (err) {
          setError("Item not found or server error.",err.response?.data?.message || "An error occurred");
        }
      };
      fetchItem();
    }
  }, [id, items]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!item) return <p>Loading item details...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>{item.name}</h2>
      <p><strong>Description:</strong> {item.description}</p>
      <p><strong>Category:</strong> {item.category}</p>
      <p><strong>Owner:</strong> {item.user?.name || "Unknown"}</p>

      <div style={{ marginTop: "1rem" }}>
        <button style={{ marginRight: "1rem" }}>🔁 Swap</button>
        <button>👤 View Profile</button>
      </div>
    </div>
  );
}
