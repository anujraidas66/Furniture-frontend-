import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const user = useSelector((state) => state.userSlice.user);

  // If user NOT logged in → go to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If logged in → allow access
  return children;
}