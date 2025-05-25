import React, { useState } from "react";
import "../styles/DecorManager.css";
import { motion, AnimatePresence } from "framer-motion";
import { FiEdit, FiTrash2, FiCamera, FiX } from "react-icons/fi";

const initialDecor = [];

export default function DecorManager() {
  const [decor, setDecor] = useState(initialDecor);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDecor, setEditingDecor] = useState(null);

  const handleDelete = (id) => {
    setDecor(decor.filter((v) => v.id !== id));
  };

  const handleSave = (updatedDecor) => {
    if (editingDecor) {
      setDecor(decor.map((v) => (v.id === updatedDecor.id ? updatedDecor : v)));
    } else {
      setDecor([...decor, { ...updatedDecor, id: Date.now() }]);
    }
    setModalOpen(false);
    setEditingDecor(null);
  };

  return (
    <div className="Decor-container">
      <div className="header-top">
        <div className="header">
          <h1>Manage Decor</h1>
          <p>Add, edit, or delete Decor listings</p>
        </div>
        <button onClick={() => setModalOpen(true)} className="add-button">
          + Add Decor
        </button>
      </div>

      <div className="table-wrapper">
        <div className="table-header">
          <span>Decor</span>
          <span>LOCATION</span>
          <span>PRICE ₵</span>
          <span>RATING</span>
          <span>CATEGORIES</span>
          <span>ACTIONS</span>
        </div>

        <AnimatePresence>
          {decor.map((decor) => (
            <motion.div
              key={decor.id}
              className="table-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="Decor-info">
                <img src={decor.image} alt={decor.name} />
                <span>{decor.name}</span>
              </div>
              <span>{decor.location}</span>
              <span>{decor.price}</span>
              <span>{decor.rating}</span>
              <div className="categories">
                {decor.categories.map((c) => (
                  <span key={c} className="category-tag">
                    {c}
                  </span>
                ))}
              </div>
              <div className="actions">
                <FiEdit
                  className="edit"
                  onClick={() => {
                    setEditingDecor(decor);
                    setModalOpen(true);
                  }}
                />
                <FiTrash2
                  className="delete"
                  onClick={() => handleDelete(decor.id)}
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
              setEditingDecor(null);
            }}
            onSave={handleSave}
            decor={editingDecor}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function Modal({ onClose, onSave, decor }) {
  const [formData, setFormData] = useState(
    decor || {
      name: "",
      location: "",
      price: "",
      rating: "",
      categories: [],
      image: "",
    }
  );

  const [previewImage, setPreviewImage] = useState(decor?.image || "");

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
        <h2>{decor ? "Edit Decor" : "Add New Decor"}</h2>
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
            onClick={() => onSave({ ...formData, id: decor?.id || Date.now() })}
            className="save"
          >
            Save
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}