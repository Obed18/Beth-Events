import React from "react";
import { motion } from "framer-motion";
import "../styles/Admin/RecentVenues.css";

const venues = [
  {
    name: "Grand Ballroom",
    location: "Downtown, New York",
    price: "$2500",
    rating: 4.8,
    categories: ["decor", "lighting"],
  },
  {
    name: "Seaside Terrace",
    location: "Malibu, California",
    price: "$3000",
    rating: 4.9,
    categories: ["decor"],
  },
  {
    name: "Urban Loft",
    location: "Brooklyn, New York",
    price: "$1800",
    rating: 4.6,
    categories: ["lighting"],
  },
  {
    name: "Garden Estate",
    location: "Austin, Texas",
    price: "$2200",
    rating: 4.7,
    categories: ["decor", "catering"],
  },
  {
    name: "Historic Theater",
    location: "Chicago, Illinois",
    price: "$2800",
    rating: 4.5,
    categories: ["lighting", "catering"],
  },
];

const RecentVenues = () => {
  return (
    <motion.div
      className="recent-venues-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="title">Recent Venues</h2>
      <div className="table">
        <div className="table-header">
          <span>Name</span>
          <span>Location</span>
          <span>Price</span>
          <span>Rating</span>
          <span>Categories</span>
        </div>
        {venues.map((venue, index) => (
          <motion.div
            className="table-row"
            key={index}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <span className="venue-name">{venue.name}</span>
            <span className="venue-location">{venue.location}</span>
            <span className="venue-price">{venue.price}</span>
            <span className="venue-rating">
              <span className="star">★</span> {venue.rating}
            </span>
            <span className="venue-categories">
              {venue.categories.map((cat, i) => (
                <span className="category-tag" key={i}>
                  {cat}
                </span>
              ))}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RecentVenues;
