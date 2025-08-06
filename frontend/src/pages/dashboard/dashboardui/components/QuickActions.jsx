import React from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle, Settings, Layers } from "lucide-react";
import './QuickActions.css';

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="quick-actions-container">
      <h2 className="quick-actions-title">Quick Actions</h2>

      <div className="quick-actions-list">
        <button
          onClick={() => navigate("/dashboard/create")}
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
      </div>
    </div>
  );
}
