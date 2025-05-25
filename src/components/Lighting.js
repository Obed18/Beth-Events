import React, { useState } from "react";
import "../styles/DecorManager.css"; // You may want to rename the CSS file too
import { motion, AnimatePresence } from "framer-motion";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { FiCamera, FiX } from "react-icons/fi";

const initialLighting = [];

export default function LightingManager() {
  const [lighting, setLighting] = useState(initialLighting);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingLighting, setEditingLighting] = useState(null);

  const handleDelete = (id) => {
    setLighting(lighting.filter((v) => v.id !== id));
  };

  const handleSave = (updatedLighting) => {
    if (editingLighting) {
      setLighting(
        lighting.map((v) => (v.id === updatedLighting.id ? updatedLighting : v))
      );
    } else {
      setLighting([...lighting, { ...updatedLighting, id: Date.now() }]);
    }
    setModalOpen(false);
    setEditingLighting(null);
  };

  return (
    <div className="Decor-container">
      <div className="header-top">
        <div className="header">
          <h1>Manage Lighting</h1>
          <p>Add, edit, or delete lighting listings</p>
        </div>
        <button onClick={() => setModalOpen(true)} className="add-button">
          + Add Lighting
        </button>
      </div>

      <div className="table-wrapper">
        <div className="table-header">
          <span>Lighting</span>
          <span>LOCATION</span>
          <span>PRICE ₵</span>
          <span>RATING</span>
          <span>CATEGORIES</span>
          <span>ACTIONS</span>
        </div>

        <AnimatePresence>
          {lighting.map((light) => (
            <motion.div
              key={light.id}
              className="table-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="Decor-info">
                <img src={light.image} alt={light.name} />
                <span>{light.name}</span>
              </div>
              <span>{light.location}</span>
              <span>{light.price}</span>
              <span>{light.rating}</span>
              <div className="categories">
                {light.categories.map((c) => (
                  <span key={c} className="category-tag">
                    {c}
                  </span>
                ))}
              </div>
              <div className="actions">
                <FiEdit
                  className="edit"
                  onClick={() => {
                    setEditingLighting(light);
                    setModalOpen(true);
                  }}
                />
                <FiTrash2
                  className="delete"
                  onClick={() => handleDelete(light.id)}
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
              setEditingLighting(null);
            }}
            onSave={handleSave}
            lighting={editingLighting}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function Modal({ onClose, onSave, lighting }) {
  const [formData, setFormData] = useState(
    lighting || {
      name: "",
      location: "",
      price: "",
      rating: "",
      categories: [],
      image: "",
    }
  );

  const [previewImage, setPreviewImage] = useState(lighting?.image || "");

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
        <h2>{lighting ? "Edit Lighting" : "Add New Lighting"}</h2>
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
            onClick={() =>
              onSave({ ...formData, id: lighting?.id || Date.now() })
            }
            className="save"
          >
            Save
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
