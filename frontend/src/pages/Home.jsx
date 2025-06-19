import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../features/items/itemSlice";
import ItemCard from "../components/ui/ItemCard";
import SearchBar from "../components/ui/SearchBar";
import FilterBox from "../components/ui/FilterBox";

export default function Home() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.items);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  // Fetch items when category changes
  useEffect(() => {
    let query = "?";
    if (category) query += `category=${category}`;
    dispatch(fetchItems(query));
  }, [dispatch, category]);

  console.log("items from redux:", items);

  // Only filter if search has text
  const filteredItems =
    search.trim() === ""
      ? items
      : items.filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        );

  return (
    <div style={{ padding: "1rem" }}>
      <h2>All Items</h2>

      <SearchBar onSearch={setSearch} />
      <FilterBox onFilter={setCategory} />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ display: "grid", gap: "1rem" }}>
        {filteredItems.length === 0 ? (
          <p>No items found.</p>
        ) : (
          filteredItems.map((item) => <ItemCard key={item._id} item={item} />)
        )}
      </div>
    </div>
  );
}
