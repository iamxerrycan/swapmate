//src/pages/dashboard/index.jsx

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function DashboardIndex() {
  const user = useSelector((state) => state.auth.user);

  if (!user) return <Navigate to="/login" />;

  return <Navigate to="/dashboard/overview" />;
}
