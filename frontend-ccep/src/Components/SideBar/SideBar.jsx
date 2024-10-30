import React, { useState } from "react";
import { SideBarLink } from "./SideBarLink";
import "../../Styles/SideBar/SideBar.css";
import Cookies from "js-cookie";

function SideBar({ isSidebarOpen, toggleSidebar }) {
  //Utiles
  const [utilsOpen, setUtilsOpen] = useState(false); // Estado para controlar si las subpestañas están abiertas o cerradas
  const [isActiveAnimation, setIsActiveAnimation] = useState(false); //Estado para controlar el estado de la animacion

  //Sales
  const [salesOpen, setSalesOpen] = useState(false);

  //Purchases
  const [purchasesOpen, setPurchasesOpen] = useState(false);

  // Función para alternar el estado de las subpestañas y activar los sublinks
  const toggleUtils = () => {
    setUtilsOpen(!utilsOpen);
    setIsActiveAnimation(!isActiveAnimation);
  };

  const toggleSales = () => {
    setSalesOpen(!salesOpen);
  };

  const togglePurchases = () => {
    setPurchasesOpen(!purchasesOpen);
  };

  const user = JSON.parse(Cookies.get("user"));
  const userRole = user.roles[0].name_role;
  const userEmail = user.email;

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
          {userRole === "Administrador" ? (
            <li>
              <SideBarLink
                to="products"
                text="Productos"
                icon="bx bx-barcode"
              />
            </li>
          ) : null}

          {userRole === "Administrador" ? (
            <li>
              <SideBarLink
                to="inventories"
                text="Inventario"
                icon="bx bx-data"
              />
            </li>
          ) : null}

          {userRole === "Administrador" || userRole === "Vendedor" ? (
            <li>
              <nav id="nav">
                <a id="a" onClick={() => setSalesOpen(!salesOpen)}>
                  <i className="bx bx-cart"></i>
                  <span className="links_name">Ventas</span>
                </a>
                <span className="tooltip">Ventas</span>
              </nav>
            </li>
          ) : null}
          {salesOpen && (
            <>
              {userRole === "Administrador" ? (
                <li>
                  <SideBarLink
                    to="sales"
                    text="Lista de Ventas"
                    icon="bx bx-detail"
                  />
                </li>
              ) : null}
              {userRole === "Administrador" || userRole === "Vendedor" ? (
                <li>
                  <SideBarLink
                    to="pos"
                    text="Realizar Ventas"
                    icon="bx bx-cart-add"
                  />
                </li>
              ) : null}
            </>
          )}

          {userRole === "Administrador" ? (
            <li>
              <nav id="nav">
                <a id="a" onClick={togglePurchases}>
                  <i className="bx bxs-sticker"></i>
                  <span className="links_name">Compras</span>
                </a>
                <span className="tooltip">Compras</span>
              </nav>
            </li>
          ) : null}

          {purchasesOpen && userRole === "Administrador" ? (
            <>
              <li>
                <SideBarLink
                  to="purchases"
                  text="Compras"
                  icon="bx bx-library"
                />
              </li>
              <li>
                <SideBarLink
                  to="edc"
                  text="Realizar Compras"
                  icon="bx bx-purchase-tag-alt"
                />
              </li>
            </>
          ) : null}

          {userRole === "Administrador" ? (
            <li>
              <nav id="nav">
                <a id="a" onClick={() => setUtilsOpen(!utilsOpen)}>
                  <i className="bx bx-key"></i>
                  <span className="links_name">Utilidades</span>
                </a>
                <span className="tooltip">Utilidades</span>
              </nav>
            </li>
          ) : null}

          {utilsOpen && userRole === "Administrador" ? (
            <>
              <li>
                <SideBarLink
                  to="categories"
                  text="Categorias"
                  icon="bx bx-box"
                />
              </li>
              <li>
                <SideBarLink
                  to="subcategories"
                  text="SubCategorias"
                  icon="bx bx-folder"
                />
              </li>
              <li>
                <SideBarLink
                  to="suppliers"
                  text="Proveedores"
                  icon="bx bxs-truck"
                />
              </li>
            </>
          ) : null}
          <li className="profile">
            <div className="profile-details">
              <img src="profile.jpg" alt="profileImg" />
              <div className="name_job">
                <div className="name">{userEmail}</div>
                <div className="job">{userRole}</div>
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
