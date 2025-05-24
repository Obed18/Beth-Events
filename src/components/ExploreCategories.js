import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "../styles/ExploreCategories.css";

const categories = [
  {
    title: "Decor",
    description: "Transform your venue with stunning decoration packages",
    image:
      "https://images.unsplash.com/photo-1561047741-8999b48b20d2?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    path: "/decor",
  },
  {
    title: "Lighting",
    description: "Set the mood with ambient or themed lighting solutions",
    image:
      "https://images.unsplash.com/photo-1563099045-dd7d9aebaa49?q=80&w=1496&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    path: "/lighting",
  },
  {
    title: "Food/Catering",
    description: "Culinary experiences for every taste and occasion",
    image:
      "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    path: "/catering",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const ExploreCategories = () => {
  return (
    <div className="categories-container">
      <motion.h2
        className="categories-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Explore Categories
      </motion.h2>
      <motion.p
        className="categories-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        From decorations to catering, find everything you need for your event
      </motion.p>

      <div className="card-grid">
        {categories.map((cat, i) => (
          <Link to={cat.path} key={i} className="category-link">
            <motion.div
              className="category-card"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
            >
              <div
                className="card-image"
                style={{ backgroundImage: `url(${cat.image})` }}
              >
                <div className="card-content">
                  <h3>{cat.title}</h3>
                  <p>{cat.description}</p>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ExploreCategories;
