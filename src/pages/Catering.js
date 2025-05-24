import React from "react";
import "../styles/global.css";
import Navbar from "../components/Navbar";
import CateringBrowser from "../components/CateringBrowser";
import Footer from "../components/Footer";

const Catering = () => {
  return (
    <div className="CateringBrowser">
      <Navbar />
      <CateringBrowser />
      <Footer />
    </div>
  );
};

export default Catering;
