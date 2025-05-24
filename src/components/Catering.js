import React, { useState } from "react";
import "../styles/CateringManager.css";
import { motion, AnimatePresence } from "framer-motion";
import { FiEdit, FiTrash2, FiCamera, FiX } from "react-icons/fi";

const initialCatering = [];

export default function CateringManager() {
  const [catering, setCatering] = useState(initialCatering);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCatering, setEditingCatering] = useState(null);

const handleDelete = async (id) => {
  const { error } = await supabase.from('Catering').delete().eq('id', id);
  if (error) console.error(error);
  else setCatering(catering.filter(item => item.id !== id));
};
const handleSave = async (newItem) => {
  if (editingCatering) {
    const { data, error } = await supabase
      .from('Catering')
      .update(newItem)
      .eq('id', editingCatering.id);
  } else {
    const { data, error } = await supabase
      .from('Catering')
      .insert([newItem]);
  }

  // Refresh the list
  const { data } = await supabase.from('Catering').select('*');
  setCatering(data);
  setModalOpen(false);
  setEditingCatering(null);
};
  return (
    <div className="Catering-container">
      <div className="header-top">
        <div className="header">
          <h1>Manage Catering</h1>
          <p>Add, edit, or delete catering listings</p>
        </div>
        <button onClick={() => setModalOpen(true)} className="add-button">
          + Add Catering
        </button>
      </div>

      <div className="table-wrapper">
        <div className="table-header">
          <span>Name</span>
          <span>LOCATION</span>
          <span>PRICE</span>
          <span>RATING</span>
          <span>CATEGORIES</span>
          <span>ACTIONS</span>
        </div>

        <AnimatePresence>
          {catering.map((item) => (
            <motion.div
              key={item.id}
              className="table-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="Catering-info">
                <img src={item.image} alt={item.name} />
                <span>{item.name}</span>
              </div>
              <span>{item.location}</span>
              <span>{item.price}</span>
              <span>{item.rating}</span>
              <div className="categories">
                {item.categories.map((c) => (
                  <span key={c} className="category-tag">
                    {c}
                  </span>
                ))}
              </div>
              <div className="actions">
                <FiEdit
                  className="edit"
                  onClick={() => {
                    setEditingCatering(item);
                    setModalOpen(true);
                  }}
                />
                <FiTrash2
                  className="delete"
                  onClick={() => handleDelete(item.id)}
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
              setEditingCatering(null);
            }}
            onSave={handleSave}
            catering={editingCatering}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function Modal({ onClose, onSave, catering }) {
  const [formData, setFormData] = useState(
    catering || {
      name: "",
      location: "",
      price: "",
      rating: "",
      categories: [],
      image: "",
    }
  );

  const [previewImage, setPreviewImage] = useState(catering?.image || "");

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
        <h2>{catering ? "Edit Catering" : "Add New Catering"}</h2>
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
        />
        <div className="price-input-wrapper">
          <span className="currency-symbol">₵</span>
          <input
            name="price"
            placeholder="0.00"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <input
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />
        <input
          name="rating"
          placeholder="Rating"
          value={formData.rating}
          onChange={handleChange}
        />
        <input
          placeholder="Categories (comma separated)"
          onChange={handleCategoryChange}
          value={formData.categories.join(", ")}
        />
        <div className="modal-actions">
          <button onClick={onClose} className="cancel">
            Cancel
          </button>
          <button
            onClick={() =>
              onSave({ ...formData, id: catering?.id || Date.now() })
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
