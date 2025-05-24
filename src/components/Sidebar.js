import { MdOutlineDashboard } from "react-icons/md";
import React from "react";
import { PiSignOutBold } from "react-icons/pi";
import { FaLayerGroup } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa6";
import { MdLightMode } from "react-icons/md";
import { MdFastfood } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";

const Sidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  setActivePage,
  activePage,
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/admin/login");
  };

  return (
    <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
      {isSidebarOpen && (
        <button
          className="close-sidebar"
          onClick={() => setIsSidebarOpen(false)}
        >
          ✖
        </button>
      )}

      <div className="sidebar-logo-section">
        <div className="sidebar-logo">
          <img
            src="https://thekingsunion.org/asset/tku-logo.jpeg"
            className="sidebar-logo-img"
            alt="Logo"
          />
        </div>
        <div className="logo">
          <span className="logo-purple">Beth</span>
          <span className="logo-orange">Events</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav-links">
        <button
          className={`sidebar-nav-item ${
            activePage === "dashboard" ? "active" : ""
          }`}
          onClick={() => setActivePage("dashboard")}
        >
          <MdOutlineDashboard className="sidebar-nav-icon" />
          Dashboard
        </button>
        <button
          className={`sidebar-nav-item ${
            activePage === "venues" ? "active" : ""
          }`}
          onClick={() => setActivePage("venues")}
        >
          <FaLayerGroup className="sidebar-nav-icon" />
          Venues
        </button>
        <button
          className={`sidebar-nav-item ${
            activePage === "decor" ? "active" : ""
          }`}
          onClick={() => setActivePage("decor")}
        >
          <FaBuilding className="sidebar-nav-icon" />
          Decor
        </button>
        <button
          className={`sidebar-nav-item ${
            activePage === "lighting" ? "active" : ""
          }`}
          onClick={() => setActivePage("lighting")}
        >
          <MdLightMode className="sidebar-nav-icon" />
          Lighting
        </button>
        <button
          className={`sidebar-nav-item ${
            activePage === "catering" ? "active" : ""
          }`}
          onClick={() => setActivePage("catering")}
        >
          <MdFastfood className="sidebar-nav-icon" />
          Catering
        </button>
      </nav>

      {/* Footer Icons */}
      <div className="sidebar-footer-icons">
        <button className="sidebar-footer-btn" onClick={handleLogout}>
          <PiSignOutBold /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
