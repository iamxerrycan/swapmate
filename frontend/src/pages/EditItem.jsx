import { useParams } from 'react-router-dom';
import './EditItem.css';

export default function EditItem() {
  const { id } = useParams();

  return (
    <div className="edit-item-page">
      <h2>Edit Item - {id}</h2>
      {/* Add form for editing or deleting item here */}
    </div>
  );
}
