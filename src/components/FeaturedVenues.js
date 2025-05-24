import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaStar, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/FeaturedVenues.css";

const venues = [
  {
    id: 1,
    title: "Conference Center",
    location: "Accra, Ghana",
    price: "2500",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1542665952-14513db15293?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    title: "Legon Terrace",
    location: "Accra, Ghana",
    price: "3000",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    title: "Brunei Astro Turf",
    location: "Kumasi, Ghana",
    price: "1800",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1728520512146-ab57cd1279c5?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const FeaturedVenues = () => {
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [formData, setFormData] = useState({ name: "", reason: "" });
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

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

  return (
    <>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="featured-title"
      >
        Featured Venues
      </motion.h2>
      <p className="featured-subtitle">
        Discover our handpicked selection of stunning venues perfect for any
        event
      </p>

      <div className="featured-container">
        {venues.map((venue) => (
          <motion.div
            className="venue-venue-card"
            key={venue.id}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="image-wrapper">
              <img src={venue.image} alt={venue.title} />
              <span className="rating">
                <FaStar className="star" /> {venue.rating}
              </span>
            </div>
            <div className="venue-venue-info">
              <h3>{venue.title}</h3>
              <div className="venue-venue-info-sub">
                <p>{venue.location}</p>
                <p className="price">₵{venue.price}</p>
              </div>
              <button onClick={() => handleContactClick(venue)}>Contact</button>
            </div>
          </motion.div>
        ))}
        <Link to="/venue">
          {" "}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="view-all-button"
          >
            View All Venues →
          </motion.button>
        </Link>
      </div>

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
            <h3>Request: {selectedVenue.title}</h3>
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

      {showToast && (
        <div className="toast">
          <span>Form successfully submitted!</span>
          <button className="toast-close" onClick={() => setShowToast(false)}>
            <FaTimes />
          </button>
        </div>
      )}
    </>
  );
};

export default FeaturedVenues;
