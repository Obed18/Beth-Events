// src/components/PlanEventSection.js
import React from "react";
import { motion } from "framer-motion";
import "../styles/PlanEventSection.css";
import { Link } from "react-router-dom";

const PlanEventSection = () => {
  return (
    <section className="plan-event-section">
      <motion.h2
        className="plan-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Ready to Plan Your Event?
      </motion.h2>

      <motion.p
        className="plan-subtitle"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Start browsing venues and vendors to create your perfect event
      </motion.p>

      <motion.div
        className="plan-buttons"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <Link to="/venue">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn browse"
          >
            Browse Venues
          </motion.button>
        </Link>{" "}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn contact"
        >
          Contact Us
        </motion.button>
      </motion.div>
    </section>
  );
};

export default PlanEventSection;
