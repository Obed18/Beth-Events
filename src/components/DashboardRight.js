import React from "react";
import "../styles/DashboardRight.css";
import HeaderSection from "../components/HeaderSection";
import AdminMain from "../components/AdminMain";
import VenuesManager from "../components/VenueManager"; // Make sure this path is correct
import DecorManager from "../components/Decor"; // Make sure this path is correct
import Lighting from "../components/Lighting"; // Make sure this path is correct
import Catering from "../components/Catering"; // Make sure this path is correct

const DashboardRight = ({ setIsSidebarOpen, activePage }) => {
  return (
    <div className="DashboardRight">
      {/* Header Section with Sidebar Toggle */}
      <HeaderSection setIsSidebarOpen={setIsSidebarOpen} />

      {/* Conditional rendering based on active page */}
      {activePage === "dashboard" && <AdminMain />}
      {activePage === "venues" && <VenuesManager />}
      {activePage === "decor" && <DecorManager />}
      {activePage === "lighting" && <Lighting />}
      {activePage === "catering" && <Catering />}
    </div>
  );
};

export default DashboardRight;
