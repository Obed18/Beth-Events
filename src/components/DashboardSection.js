// src/components/DashboardSection.jsx
import React from "react";
import { motion } from "framer-motion";
import "../styles/DashboardSection.css";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      type: "spring",
    },
  }),
};

const DashboardSection = () => {
  const cards = [{ title: "Bookings Overview" }, { title: "Top Rated Venues" }];

  return (
    <div className="dashboard-container">
      {cards.map((card, index) => (
        <motion.div
          className="dashboard-card"
          key={index}
          custom={index}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={cardVariants}
        >
          <h3 className="dashboard-title">{card.title}</h3>
          <div className="chart-placeholder">
            <img
              src="https://img.icons8.com/ios-filled/50/8a2be2/combo-chart.png"
              alt="Chart icon"
            />
            <p>Analytics chart placeholder</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardSection;
