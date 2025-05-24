import React from "react";
import "../styles/DashboardHeader.css";

const HeaderSection = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <header className="AdminMain-dashboard-header">
      <h1 className="AdminMain-dashboard-title">Dashboard</h1>

      {/* Show Menu Button (☰) only when Sidebar is Closed */}
      {!isSidebarOpen && (
        <button
          className="sidebar-toggle-btn AdminMain-mobile-menu"
          onClick={() => setIsSidebarOpen(true)} // Open Sidebar
        >
          ☰
        </button>
      )}
    </header>
  );
};

export default HeaderSection;
