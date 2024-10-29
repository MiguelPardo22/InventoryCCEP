import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import ServiceAuth from "../../Services/ServiceAuth";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2"; // Importamos SweetAlert2

function ProtectedRoute({ element, requiresAuth }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const token = sessionStorage.getItem("authToken");
  const location = useLocation();

  useEffect(() => {
    if (requiresAuth && token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      const timeLeft = decodedToken.exp - currentTime;

      if (timeLeft > 0) {
        // Hacer la solicitud al backend para validar el token
        ServiceAuth.verifyToken(token)
          .then((response) => {
            if (response.data.success) {
              setIsAuthenticated(true);

              // Verificar si faltan 5 minutos o menos para que el token expire
              if (timeLeft <= 300) {
                Swal.fire({
                  title: "Sesión a punto de expirar",
                  text: "Su sesión está a punto de expirar. ¿Desea cerrar sesión y volver a autenticarse?",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonText: "Sí, cerrar sesión",
                  cancelButtonText: "Cancelar",
                }).then((result) => {
                  if (result.isConfirmed) {
                    sessionStorage.removeItem("authToken");
                    setIsAuthenticated(false);
                  }
                });
              }
            } else {
              setIsAuthenticated(false);
            }
          })
          .catch(() => {
            setIsAuthenticated(false);
          });
      } else {
        setIsAuthenticated(false);
      }
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
