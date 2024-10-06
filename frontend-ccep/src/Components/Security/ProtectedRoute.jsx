import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import ServiceAuth from "../../Services/ServiceAuth";

function ProtectedRoute({ element, requiresAuth }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const token = sessionStorage.getItem("authToken");
  const location = useLocation();

  useEffect(() => {
    if (requiresAuth && token) {
      // Hacer la solicitud al backend para validar el token
      ServiceAuth.verifyToken(token)
        .then((response) => {
          if (response.data.success) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        })
        .catch(() => {
          setIsAuthenticated(false);
        });
    } else if (requiresAuth && !token) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  }, [token, requiresAuth]);

  if (isAuthenticated === null) {
    return (
      <div>
        <i className="fa-solid fa-arrow-rotate-right fa-spin"></i>
      </div>
    );
  }

  // Si no está autenticado, redirigir al login
  if (isAuthenticated === false) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return element;
}

export { ProtectedRoute };
