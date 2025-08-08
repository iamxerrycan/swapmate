import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle, Settings, Layers } from "lucide-react";
import './QuickActions.css';
import CreateItemModal from "./CreateItemModal";

export default function QuickActions() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="quick-actions-container">
      <h2 className="quick-actions-title">Quick Actions</h2>

      <div className="quick-actions-list">
        <button
          onClick={() => setShowModal(true)}
          className="quick-action-button quick-action-create"
        >
          <PlusCircle size={18} />
          Create New Item
        </button>

        <button
          onClick={() => navigate("/dashboard/manage")}
          className="quick-action-button quick-action-manage"
        >
          <Layers size={18} />
          Manage Items
        </button>

        <button
          onClick={() => navigate("/dashboard/settings")}
          className="quick-action-button quick-action-settings"
        >
          <Settings size={18} />
          Settings
        </button>

        <button onClick={() => navigate("/dashboard/notifications")} className="quick-action-button quick-action-notifications">
        
          <Layers size={18} />
          Notifications
        </button>
<button onClick={() => navigate("/dashboard/manageswap")} className="quick-action-button quick-action-swap">
              <Layers size={18} />
              Manage Swap
            </button>

      </div>

      

      {showModal && <CreateItemModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
