import React from "react";
import "../../Styles/NavBar/NavBar.css";

function NavBar() {
  return (
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <i className="fa-solid fa-paw icon"></i> CCEP
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item text-ccep">
              <a class="nav-link active" aria-current="page" href="#">
                Inicio
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Realizar Venta
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Realizar Compra
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled">Cerrar Sesion</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export { NavBar };
