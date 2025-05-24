import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { NavLink } from "react-router-dom"; // changed from Link to NavLink
import "../styles/Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    { label: "Home", path: "/" },
    { label: "Venues", path: "/venue" },
    { label: "Decor", path: "/decor" },
    { label: "Lighting", path: "/lighting" },
    { label: "Catering", path: "/catering" },
    { label: "Admin", path: "/admin/login" },
  ];

  return (
    <>
      <motion.nav
        className="navbar"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="logo">
          <span className="logo-purple">Beth</span>
          <span className="logo-orange">Events</span>
        </div>

        {/* Desktop nav */}
        <ul className="nav-links">
          {navItems.map((item) => (
            <motion.li
              key={item.label}
              whileHover={{ scale: 1.1 }}
              className="nav-item"
            >
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                {item.label}
              </NavLink>
            </motion.li>
          ))}
          <motion.button
            className="vendor-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
           Contact
          </motion.button>
        </ul>

        {/* Mobile menu icon */}
        <div className="menu-icon" onClick={() => setIsOpen(true)}>
          <FiMenu size={28} />
        </div>
      </motion.nav>

      {/* Sidebar and backdrop */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="sidebar-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar */}
            <motion.aside
              className="mobile-sidebar"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Close Icon */}
              <div className="close-icon" onClick={() => setIsOpen(false)}>
                <FiX size={28} />
              </div>

              {/* Menu Items */}
              {navItems.map((item) => (
                <motion.div
                  key={item.label}
                  className="mobile-nav-item"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsOpen(false)}
                >
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.button
                className="mobile-vendor-button"
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(false)}
              >
                Become a Vendor
              </motion.button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
