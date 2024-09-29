import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ element, requiresAuth }) {
  const token = sessionStorage.getItem("authToken");
  const location = useLocation();

  if (requiresAuth && !token) {
    
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return element;
}

export { ProtectedRoute };
