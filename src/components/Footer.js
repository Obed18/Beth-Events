import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Instagram,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

export default function FooterSection() {
  return (
    <footer className="footer">
      <motion.div
        className="footer-container"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="footer-column">
          <h3 className="logo-text">
            Beth<span className="highlight">Events</span>
          </h3>
          <p>Find the perfect venue and vendors for your special event.</p>
          <div className="social-icons">
            <Facebook size={20} />
            <Twitter size={20} />
            <Instagram size={20} />
          </div>
        </div>

        <div className="footer-column">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/venue">Venues</Link>
            </li>
            <li>
              <Link to="/decor">Decor Services</Link>
            </li>
            <li>
              <Link to="/lighting">Lighting Services</Link>
            </li>
            <li>
              <Link to="/catering">Catering Services</Link>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Categories</h4>
          <ul>
            <li>Dinner Venues</li>
            <li>Corporate Events</li>
            <li>Sports</li>
            <li>Outdoor Venues</li>
            <li>Luxury Venues</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Contact Us</h4>
          <ul className="contact-info">
            <li>
              <MapPin size={16} /> Accra, Ghana
            </li>
            <li>
              <Phone size={16} /> (000) 000-0000
            </li>
            <li>
              <Mail size={16} /> contact@bethevents.com
            </li>
          </ul>
        </div>
      </motion.div>

      <motion.div
        className="footer-bottom"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <p>© 2025 BethEvents. All rights reserved.</p>
      </motion.div>
    </footer>
  );
}
