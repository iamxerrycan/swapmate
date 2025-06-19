import { useSelector } from 'react-redux';

export default function Profile() {
  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.items);

  const currentUserId = user?.user?._id;

  const myItems = Array.isArray(items)
    ? items.filter((item) => item?.user?._id === currentUserId)
    : [];

  return (
    <div style={{ padding: '2rem' }}>
      <h2>👤 {user?.user?.name}'s Profile</h2>
      <p>Email: {user?.user?.email}</p>

      <h3 style={{ marginTop: '2rem' }}>Your Items</h3>

      {myItems.length === 0 ? (
        <p>You haven't listed any items yet.</p>
      ) : (
        <ul>
          {myItems.map((item) => (
            <li key={item._id}>
              <strong>{item.name}</strong> - {item.category}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
