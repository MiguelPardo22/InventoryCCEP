import React from "react";
import { SideBarLink } from "./SideBarLink";

function SideBar({ isSidebarOpen, toggleSidebar }) {
  return (
    <>
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="logo-details">
          <i className="fa-solid fa-paw icon"></i>
          {/* <div className="logo_name">CCEP</div> */}
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