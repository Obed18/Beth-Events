import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaStar, FaTimes } from "react-icons/fa";
import { Search, ArrowUpDown } from "lucide-react";
import "../styles/DecorBrowser.css";

const decorData = [
  {
    id: 1,
    name: "Floral Arch",
    location: "Accra",
    price: 400,
    image:
      "https://images.unsplash.com/photo-1578898884381-b2f4cb0b87c6?q=80&w=1470&auto=format&fit=crop",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Elegant Table Setup",
    location: "East Legon",
    price: 600,
    image:
      "https://images.unsplash.com/photo-1601312378156-7e1c31b0f64f?q=80&w=1470&auto=format&fit=crop",
    rating: 4.9,
  },
  {
    id: 3,
    name: "Balloon Garland",
    location: "Accra",
    price: 300,
    image:
      "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?q=80&w=1470&auto=format&fit=crop",
    rating: 4.6,
  },
  {
    id: 4,
    name: "Rustic Backdrop",
    location: "Kumasi",
    price: 550,
    image:
      "https://images.unsplash.com/photo-1610727109792-c501bbde2d15?q=80&w=1470&auto=format&fit=crop",
    rating: 4.7,
  },
  {
    id: 5,
    name: "Beach Lantern Setup",
    location: "Accra",
    price: 500,
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1470&auto=format&fit=crop",
    rating: 4.5,
  },
  {
    id: 6,
    name: "Garden Lights",
    location: "Aburi",
    price: 700,
    image:
      "https://images.unsplash.com/photo-1612158742455-2dbee8ebd808?q=80&w=1470&auto=format&fit=crop",
    rating: 4.9,
  },
];

const DecorBrowser = () => {
  const [price, setPrice] = useState(1000);
  const [locationFilters, setLocationFilters] = useState([]);
  const [selectedDecor, setSelectedDecor] = useState(null);
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

  const filteredDecor = decorData
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
    <div className="decor-browser">
      {/* === Top Search & Sort Section === */}
      <section className="venue-header">
        <div className="venue-header-left">
          <h1>Venues</h1>
          <p>Find the perfect Venues for your event</p>
          <div className="venue-search-bar">
            <input
              type="text"
              placeholder="Search venues..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="venue-search-icon" size={18} />
          </div>
        </div>

        <div className="venue-header-right">
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

      <div className="decor-list">
        {filteredDecor.map((decor) => (
          <motion.div
            className="decor-card"
            key={decor.id}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="image-wrapper">
              <img src={decor.image} alt={decor.name} />
              <span className="rating">
                <FaStar className="star" /> {decor.rating}
              </span>
            </div>
            <div className="decor-info">
              <h3>{decor.name}</h3>
              <div className="decor-info-sub">
                <p>{decor.location}</p>
                <p className="price">₵{decor.price}</p>
              </div>
              <button
                onClick={() => {
                  setSelectedDecor(decor);
                  setShowModal(true);
                }}
              >
                Contact
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {showModal && selectedDecor && (
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
            <h3>Request: {selectedDecor.name}</h3>
            <p>
              <strong>Location:</strong> {selectedDecor.location}
            </p>
            <p>
              <strong>Price:</strong> ₵{selectedDecor.price}
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

export default DecorBrowser;

