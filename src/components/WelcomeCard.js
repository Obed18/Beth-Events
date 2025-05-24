
import React from "react";
import { motion } from "framer-motion";
import { FaLayerGroup } from "react-icons/fa";
import { MdDashboardCustomize } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { IoFastFoodOutline } from "react-icons/io5";
import { CiLight } from "react-icons/ci";
import "../styles/Dashboard.css";

const cards = [
  {
    label: "Total Venues",
    value: 6,
    icon: <FaLayerGroup />,
    trend: "Total Venues added",
    bgColor: "#f4eeff",
  },
  {
    label: "Decor",
    value: 3,
    icon: <MdDashboardCustomize />,
    trend: "Total Decor added",
    bgColor: "#eaf2ff",
  },
  {
    label: "Lighting",
    value: 4,
    icon: <CiLight />,
    trend: "Total Lighting added",
    bgColor: "#eaffea",
  },
  {
    label: "Catering",
    value: 3,
    icon: <IoFastFoodOutline />,
    trend: "Total Catering added",
    bgColor: "#eaffea",
  },
];

const Dashboard = () => {
  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-header">
        <p>Welcome to BethEvents admin panel</p>
      </div>
      <div className="admin-card-grid">
        {cards.map((card, index) => (
          <motion.div
            className="admin-dashboard-card"
            key={index}
            style={{ backgroundColor: "#fff" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.03 }}
          >
            <div className="admin-card-header">
              <span
                className="admin-card-icon"
                style={{ backgroundColor: card.bgColor }}
              >
                {card.icon}
              </span>
              <span className="admin-card-label">{card.label}</span>
            </div>
            <div className="admin-card-value">{card.value}</div>
            <div className="admin-card-trend">↗ {card.trend}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
