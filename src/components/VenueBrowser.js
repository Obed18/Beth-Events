
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { Search, ArrowUpDown } from "lucide-react";
import "../styles/VenueBrowser.css";

const VenueBrowser = () => {
  const [price, setPrice] = useState(5000);
  const [locationFilters, setLocationFilters] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [formData, setFormData] = useState({ name: "", reason: "" });
  const [showToast, setShowToast] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("low");

  const venuesData = [
    {
      id: 1,
      name: "Coference Center",
      location: "Accra",
      price: 2500,
      image:
        "https://plus.unsplash.com/premium_photo-1724753996107-a35012f43bae?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Legon Terrace",
      location: "East Legon",
      price: 3000,
      image:
        "https://images.unsplash.com/photo-1604145195376-e2c8195adf29?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.9,
    },
    {
      id: 3,
      name: "National Theatre",
      location: "Accra",
      price: 1800,
      image:
        "https://images.unsplash.com/photo-1707209210229-a32ec4b62b51?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.6,
    },
    {
      id: 4,
      name: "KNUST Law Auditorium",
      location: "Kumasi",
      price: 2200,
      image:
        "https://images.unsplash.com/photo-1596522354195-e84ae3c98731?q=80&w=1487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.7,
    },
    {
      id: 5,
      name: "Serenity Beach Resort",
      location: "Accra",
      price: 2800,
      image:
        "https://images.unsplash.com/photo-1630988276810-1565ec1b8ff3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.5,
    },
    {
      id: 6,
      name: "Aburi Botanical Gardens",
      location: "Aburi",
      price: 3500,
      image:
        "https://images.unsplash.com/photo-1690898796574-e846ec973126?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.9,
    },
  ];

  const handleCheckbox = (loc) => {
    setLocationFilters((prev) =>
      prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc]
    );
  };

  const handleContactClick = (venue) => {
    setSelectedVenue(venue);
    setFormData({ name: "", reason: "" });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const filteredVenues = venuesData
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
    <div className="venue-browser">
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

      {/* Venue Cards */}
      <div className="venue-venue-list">
        {filteredVenues.map((venue) => (
          <motion.div
            className="venue-venue-card"
            key={venue.id}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="image-wrapper">
              <img src={venue.image} alt={venue.name} />
              <span className="rating">
                <FaStar className="star" /> {venue.rating}
              </span>
            </div>
            <div className="venue-venue-info">
              <h3>{venue.name}</h3>
              <div className="venue-venue-info-sub">
                <p>{venue.location}</p>
                <p className="price">₵{venue.price}</p>
              </div>
              <button onClick={() => handleContactClick(venue)}>Contact</button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      {showModal && selectedVenue && (
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
            <h3>Request: {selectedVenue.name}</h3>
            <p>
              <strong>Location:</strong> {selectedVenue.location}
            </p>
            <p>
              <strong>Price:</strong> ₵{selectedVenue.price}
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

      {/* Toast */}
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

export default VenueBrowser;
