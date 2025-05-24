import React from "react";
import "../styles/AdminMain.css";
import WelcomeCard from "./WelcomeCard";
import DashboardSection from "./DashboardSection";

const AdminMain = () => {
  return (
    <div className="AdminMain">
      <WelcomeCard />
      <DashboardSection />
    </div>
  );
};

export default AdminMain;
