import React, { useState } from "react";
import { SideBarLink } from "./SideBarLink";
import "../../Styles/SideBar/SideBar.css";

function SideBar({ isSidebarOpen, toggleSidebar }) {
  //Utiles
  const [utilsOpen, setUtilsOpen] = useState(false); // Estado para controlar si las subpestañas están abiertas o cerradas
  const [isActiveAnimation, setIsActiveAnimation] = useState(false); //Estado para controlar el estado de la animacion

  //Sales
  const [salesOpen, setSalesOpen] = useState(false);

  // Función para alternar el estado de las subpestañas y activar los sublinks
  const toggleUtils = () => {
    setUtilsOpen(!utilsOpen);
    setIsActiveAnimation(!isActiveAnimation);
  };

  const toggleSales = () => {
    setSalesOpen(!salesOpen);
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
            <SideBarLink to="products" text="Productos" icon="bx bx-barcode" />
          </li>
          <li>
            <nav id="nav">
              <a id="a" onClick={toggleSales}>
                <i className="bx bx-cart"></i>
                <span className="links_name">Ventas</span>
              </a>
              <span className="tooltip"> Ventas </span>
            </nav>
          </li>
          {salesOpen && (
            <>
              <li>
                <SideBarLink
                  to="sales"
                  text="Lista de Ventas"
                  icon="bx bx-detail"
                />
              </li>
              <li>
                <SideBarLink
                  to="pos"
                  text="Realizar Ventas"
                  icon="bx bx-cart-add"
                />
              </li>
            </>
          )}
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
