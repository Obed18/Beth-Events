import { motion } from "framer-motion";
import { useState } from "react";
import "../styles/Hero.css";
import { Search, SearchIcon } from "lucide-react";

export default function HeroSection() {
  const [search, setSearch] = useState("");

  return (
    <section className="hero-section">
      <motion.h1
        className="hero-title"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Find the Perfect Venue
        <br /> for Your Event
      </motion.h1>

      <motion.p
        className="hero-subtext"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Browse top venues, decorators, catering and more for corporate
        events, and celebrations
      </motion.p>

      <motion.div
        className="hero-search"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <input
          type="text"
          placeholder="Search venues, locations, or services..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button>
          <SearchIcon size={18} />
        </button>
      </motion.div>

      <motion.div
        className="hero-buttons"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <button className="btn-yellow">Browse Venues</button>
      </motion.div>
    </section>
  );
}
