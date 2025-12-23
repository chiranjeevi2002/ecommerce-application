// src/components/auth/AdminRouteGuard.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function AdminRouteGuard({ children }) {
  const { auth } = useContext(AuthContext);

  // Not logged in
  if (!auth.token) {
    return <Navigate to="/login" replace />;
  }

  // Logged in BUT not admin
  if (auth.roles !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  // Authorized admin
  return children;
}
