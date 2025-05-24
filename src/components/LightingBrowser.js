
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaStar, FaTimes } from "react-icons/fa";
import { Search, ArrowUpDown } from "lucide-react";
import "../styles/LightingBrowser.css";

const lightingData = [
  {
    id: 1,
    name: "Ambient Uplighting",
    location: "Accra",
    price: 800,
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1470&auto=format&fit=crop",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Stage Spotlights",
    location: "East Legon",
    price: 1200,
    image:
      "https://images.unsplash.com/photo-1563293812-eccc27aaefb0?q=80&w=1470&auto=format&fit=crop",
    rating: 4.9,
  },
  {
    id: 3,
    name: "Fairy Lights Setup",
    location: "Accra",
    price: 500,
    image:
      "https://images.unsplash.com/photo-1541542684-4cfb63c9c7c2?q=80&w=1470&auto=format&fit=crop",
    rating: 4.6,
  },
  {
    id: 4,
    name: "Outdoor Floodlights",
    location: "Kumasi",
    price: 1000,
    image:
      "https://images.unsplash.com/photo-1621607516383-c77a66c21c0c?q=80&w=1470&auto=format&fit=crop",
    rating: 4.7,
  },
  {
    id: 5,
    name: "Dance Floor Lighting",
    location: "Accra",
    price: 1500,
    image:
      "https://images.unsplash.com/photo-1509228627152-72ae9ae6848c?q=80&w=1470&auto=format&fit=crop",
    rating: 4.5,
  },
  {
    id: 6,
    name: "Garden String Lights",
    location: "Aburi",
    price: 700,
    image:
      "https://images.unsplash.com/photo-1534212436684-d540b9f60c1e?q=80&w=1470&auto=format&fit=crop",
    rating: 4.9,
  },
];

const LightingBrowser = () => {
  const [price, setPrice] = useState(2000);
  const [locationFilters, setLocationFilters] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", reason: "" });
  const [showToast, setShowToast] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // ✅ Added
  const [sortOption, setSortOption] = useState("low"); // ✅ Added

  const handleCheckbox = (loc) => {
    setLocationFilters((prev) =>
      prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(false);
    setFormData({ name: "", reason: "" });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const filteredLighting = lightingData
    .filter(
      (item) =>
        item.price <= price &&
        (locationFilters.length === 0 ||
          locationFilters.includes(item.location)) &&
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "low") return a.price - b.price;
      if (sortOption === "high") return b.price - a.price;
      return 0;
    });

  return (
    <div className="lighting-browser">
      {/* === Top Search & Sort Section === */}
      <section className="lighting-header">
        <div className="lighting-header-left">
          <h1>Lighting Services</h1>
          <p>Find the perfect lighting for your event</p>
          <div className="lighting-search-bar">
            <input
              type="text"
              placeholder="Search lighting..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="lighting-search-icon" size={18} />
          </div>
        </div>

        <div className="lighting-header-right">
          <ArrowUpDown size={16} className="sort-icon" />
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>
      </section>

      <div className="lighting-list">
        {filteredLighting.map((item) => (
          <motion.div
            className="lighting-card"
            key={item.id}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="image-wrapper">
              <img src={item.image} alt={item.name} />
              <span className="rating">
                <FaStar className="star" /> {item.rating}
              </span>
            </div>
            <div className="lighting-info">
              <h3>{item.name}</h3>
              <div className="venue-info-sub">
                <p>{item.location}</p>
                <p className="price">₵{item.price}</p>
              </div>
              <button
                onClick={() => {
                  setSelectedItem(item);
                  setShowModal(true);
                }}
              >
                Contact
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {showModal && selectedItem && (
        <div className="modal-overlay">
          <motion.div
            className="modal"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <button
              className="close-button"
              onClick={() => setShowModal(false)}
            >
              <FaTimes />
            </button>
            <h3>Request: {selectedItem.name}</h3>
            <p>
              <strong>Location:</strong> {selectedItem.location}
            </p>
            <p>
              <strong>Price:</strong> ₵{selectedItem.price}
            </p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
              <textarea
                placeholder="Reason for Contact"
                value={formData.reason}
                onChange={(e) =>
                  setFormData({ ...formData, reason: e.target.value })
                }
                required
              ></textarea>
              <button className="modal-button" type="submit">
                Submit
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {showToast && (
        <div className="toast">
          <span>Form successfully submitted!</span>
          <button className="toast-close" onClick={() => setShowToast(false)}>
            <FaTimes />
          </button>
        </div>
      )}
    </div>
  );
};

export default LightingBrowser;

