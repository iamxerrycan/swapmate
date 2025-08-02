import { useParams } from 'react-router-dom';
import './SwapItem.css';

export default function SwapItem() {
  const { id } = useParams();

  return (
    <div className="swap-item-page">
      <h2>Swap Request for Item - {id}</h2>
      {/* Add future swap functionality here */}
    </div>
  );
}
