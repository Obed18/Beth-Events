
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaStar, FaTimes } from "react-icons/fa";
import { Search, ArrowUpDown } from "lucide-react";
import "../styles/CateringBrowser.css";

const cateringData = [
  {
    id: 1,
    name: "Local Dishes Deluxe",
    location: "Accra",
    price: 2500,
    image:
      "https://plus.unsplash.com/premium_photo-1724753996107-a35012f43bae?q=80&w=1470&auto=format&fit=crop",
    rating: 4.8,
  },
  {
    id: 2,
    name: "East Legon Caterers",
    location: "East Legon",
    price: 3000,
    image:
      "https://images.unsplash.com/photo-1604145195376-e2c8195adf29?q=80&w=1470&auto=format&fit=crop",
    rating: 4.9,
  },
  {
    id: 3,
    name: "Ghanaian Bites",
    location: "Accra",
    price: 1800,
    image:
      "https://images.unsplash.com/photo-1707209210229-a32ec4b62b51?q=80&w=1470&auto=format&fit=crop",
    rating: 4.6,
  },
  {
    id: 4,
    name: "Kumasi Flavors",
    location: "Kumasi",
    price: 2200,
    image:
      "https://images.unsplash.com/photo-1596522354195-e84ae3c98731?q=80&w=1487&auto=format&fit=crop",
    rating: 4.7,
  },
  {
    id: 5,
    name: "Coastal Cuisine",
    location: "Accra",
    price: 2800,
    image:
      "https://images.unsplash.com/photo-1630988276810-1565ec1b8ff3?q=80&w=1470&auto=format&fit=crop",
    rating: 4.5,
  },
  {
    id: 6,
    name: "Aburi Party Platters",
    location: "Aburi",
    price: 3500,
    image:
      "https://images.unsplash.com/photo-1690898796574-e846ec973126?q=80&w=1470&auto=format&fit=crop",
    rating: 4.9,
  },
];

const CateringBrowser = () => {
  const [price, setPrice] = useState(5000);
  const [locationFilters, setLocationFilters] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", reason: "" });
  const [showToast, setShowToast] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("low");

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

  const filteredCatering = cateringData
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
    <div className="catering-browser">
      {/* === Top Search & Sort Section === */}
      <section className="catering-header">
        <div className="catering-header-left">
          <h1>Catering Services</h1>
          <p>Find the perfect catering for your event</p>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search catering..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="search-icon" size={18} />
          </div>
        </div>

        <div className="catering-header-right">
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

      <div className="catering-list">
        {filteredCatering.map((item) => (
          <motion.div
            className="catering-card"
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
            <div className="catering-info">
              <h3>{item.name}</h3>
              <div className="catering-info-sub">
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

export default CateringBrowser;

