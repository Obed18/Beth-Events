
import React, { useState } from "react";
import "../styles/VenueManager.css";
import { motion, AnimatePresence } from "framer-motion";
import { FiEdit, FiTrash2, FiCamera, FiX } from "react-icons/fi";

const initialVenues = [];

function Modal({ onClose, onSave, venue }) {
  const [formData, setFormData] = useState(
    venue || {
      name: "",
      location: "",
      price: "",
      rating: "",
      categories: [],
      image: "",
    }
  );

  const [previewImage, setPreviewImage] = useState(venue?.image || "");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setFormData({ ...formData, image: imageUrl });
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage("");
    setFormData({ ...formData, image: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoryChange = (e) => {
    setFormData({
      ...formData,
      categories: e.target.value.split(",").map((c) => c.trim()),
    });
  };

  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="modal"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
      >
        <h2>{venue ? "Edit Venue" : "Add New Venue"}</h2>
        <div className="image-upload-wrapper">
          {previewImage ? (
            <div className="image-preview">
              <img src={previewImage} alt="Venue" />
              <FiX className="remove-icon" onClick={handleRemoveImage} />
              <label className="camera-icon">
                <FiCamera />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  hidden
                />
              </label>
            </div>
          ) : (
            <label className="camera-placeholder">
              <FiCamera size={24} />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                hidden
              />
            </label>
          )}
        </div>
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="name-input"
        />
        <input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="location-input"
        />
        <div className="input-wrapper">
          <label className="currency-prefix">₵</label>
          <input
            name="price"
            placeholder="0.00"
            value={formData.price}
            onChange={handleChange}
            className="price-input"
          />
        </div>
        <input
          name="rating"
          placeholder="Rating"
          value={formData.rating}
          onChange={handleChange}
          className="rating-input"
        />
        <input
          placeholder="Categories (comma separated)"
          onChange={handleCategoryChange}
          value={formData.categories.join(", ")}
          className="categories-input"
        />
        <div className="modal-actions">
          <button onClick={onClose} className="cancel">
            Cancel
          </button>
          <button
            onClick={() => onSave({ ...formData, id: venue?.id || Date.now() })}
            className="save"
          >
            Save
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function VenueManager() {
  const [venues, setVenues] = useState(initialVenues);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingVenue, setEditingVenue] = useState(null);

  const handleDelete = (id) => {
    setVenues(venues.filter((v) => v.id !== id));
  };

  const handleSave = (venue) => {
    if (editingVenue) {
      setVenues(venues.map((v) => (v.id === venue.id ? venue : v)));
    } else {
      setVenues([...venues, { ...venue, id: Date.now() }]);
    }
    setModalOpen(false);
    setEditingVenue(null);
  };

  return (
    <div className="venue-container">
      <div className="header-top">
        <div className="header">
          <h1>Manage Venues</h1>
          <p>Add, edit, or delete venue listings</p>
        </div>
        <button onClick={() => setModalOpen(true)} className="add-button">
          + Add Venue
        </button>
      </div>

      <div className="table-wrapper">
        <div className="table-header">
          <span>VENUE</span>
          <span>LOCATION</span>
          <span>PRICE ₵</span>
          <span>RATING</span>
          <span>CATEGORIES</span>
          <span>ACTIONS</span>
        </div>

        <AnimatePresence>
          {venues.map((venue) => (
            <motion.div
              key={venue.id}
              className="table-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="venue-info">
                <img src={venue.image} alt={venue.name} />
                <span>{venue.name}</span>
              </div>
              <span>{venue.location}</span>
              <span>{venue.price}</span>
              <span>{venue.rating}</span>
              <div className="categories">
                {venue.categories.map((c) => (
                  <span key={c} className="category-tag">
                    {c}
                  </span>
                ))}
              </div>
              <div className="actions">
                <FiEdit
                  className="edit"
                  onClick={() => {
                    setEditingVenue(venue);
                    setModalOpen(true);
                  }}
                />
                <FiTrash2
                  className="delete"
                  onClick={() => handleDelete(venue.id)}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {modalOpen && (
          <Modal
            onClose={() => {
              setModalOpen(false);
              setEditingVenue(null);
            }}
            onSave={handleSave}
            venue={editingVenue}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
