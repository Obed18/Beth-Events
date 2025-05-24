import React, { useState } from "react";
import "../styles/AdminDashboard.css";
import Sidebar from "../components/Sidebar";
import DashboardRight from "../components/DashboardRight";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("dashboard"); // "dashboard" or "venues"

  return (
    <div className="Administrator">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        setActivePage={setActivePage}
        activePage={activePage}
      />

      {/* Main Content Area */}
      <div className="admin-main-content">
        <DashboardRight
          setIsSidebarOpen={setIsSidebarOpen}
          activePage={activePage}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;