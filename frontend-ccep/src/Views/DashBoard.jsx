import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { SideBar } from "../Components/SideBar/SideBar";
import "../Styles/SideBar/SideBar.css";
import { GeneralProvider } from "../Context/GeneralContext";

function DashBoard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <GeneralProvider>
        <SideBar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`home-section ${isSidebarOpen ? "sidebar-open" : ""}`}>
          <div className="text">
            <Outlet />
          </div>
        </div>
      </GeneralProvider>
    </div>
  );
}

export { DashBoard };