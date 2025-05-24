import React from "react";
import "../styles/global.css";
import Navbar from "../components/Navbar";
import VenueBrowser from "../components/VenueBrowser";
import Footer from "../components/Footer";

const Venue = () => {
  return (
    <div className="Venue">
      <Navbar />
      <VenueBrowser />
      <Footer />
    </div>
  );
};

export default Venue;
