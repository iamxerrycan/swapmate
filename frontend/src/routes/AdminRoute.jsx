import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const { user, token } = useSelector((state) => state.auth);

  if (!token || user?.role !== "admin") {
    return <Navigate to="/home" replace />;
  }

  return children;
}
