import React, { useState } from "react";
import { SideBarLink } from "./SideBarLink";
import "../../Styles/SideBar/SideBar.css";

function SideBar({ isSidebarOpen, toggleSidebar }) {
  const [utilsOpen, setUtilsOpen] = useState(false); // Estado para controlar si las subpestañas están abiertas o cerradas
  const [isActiveAnimation, setIsActiveAnimation] = useState(false); //Estado para controlar el estado de la animacion

  // Función para alternar el estado de las subpestañas y activar los sublinks
  const toggleUtils = () => {
    setUtilsOpen(!utilsOpen);
    setIsActiveAnimation(!isActiveAnimation);
  };

  return (
    <>
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="logo-details">
          <i className="fa-solid fa-paw icon"></i>
          <i className="bx bx-menu" id="btn" onClick={toggleSidebar}></i>
        </div>
        <div className="nav-list">
          <li>
            <i className="bx bx-search"></i>
            <input type="text" placeholder="Search..." />
            <span className="tooltip">Search</span>
          </li>
          <li>
            <SideBarLink to="index" text="Inicio" icon="bx bx-grid-alt" />
          </li>
          <li>
            <SideBarLink to="products" text="Productos" icon="bx bx-football" />
          </li>
          <li>
            <nav id="nav">
              <a id="a" onClick={toggleUtils}>
                <i className="bx bx-key"></i>
                <span className="links_name">Utilidades</span>
              </a>
              <span className="tooltip"> Utilidades </span>
            </nav>
          </li>
          {/* Renderizamos las subpestañas con la clase "active" si utilsOpen es true */}
          {utilsOpen && (
            <div>
              <li className={`${isActiveAnimation ? "sub-link" : ""}`}>
                <SideBarLink
                  to="categories"
                  text="Categorias"
                  icon="bx bx-box"
                />
              </li>
              <li className={`${isActiveAnimation ? "sub-link" : ""}`}>
                <SideBarLink
                  to="subcategories"
                  text="SubCategorias"
                  icon="bx bx-folder"
                />
              </li>
              <li className={`${isActiveAnimation ? "sub-link" : ""}`}>
                <SideBarLink
                  to="suppliers"
                  text="Proveedores"
                  icon="bx bxs-truck"
                />
              </li>
            </div>
          )}
          <li className="profile">
            <div className="profile-details">
              <img src="profile.jpg" alt="profileImg" />
              <div className="name_job">
                <div className="name">Miguel Pardo</div>
                <div className="job">Administrador</div>
              </div>
            </div>
            <i className="bx bx-log-out" id="log_out"></i>
          </li>
        </div>
      </div>
    </>
  );
}

export { SideBar };
