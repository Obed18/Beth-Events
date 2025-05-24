import React from "react";
import "../styles/global.css";
import Navbar from "../components/Navbar";
import LightingBrowser from "../components/LightingBrowser";
import Footer from "../components/Footer";

const Light = () => {
  return (
    <div className="Light">
      <Navbar />
      <LightingBrowser />
      <Footer />
    </div>
  );
};

export default Light;
