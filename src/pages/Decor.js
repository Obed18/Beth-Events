import React from "react";
import "../styles/global.css";
import Navbar from "../components/Navbar";
import DecorBrowser from "../components/DecorBrowser";
import Footer from "../components/Footer";

const Decor = () => {
  return (
    <div className="DecorBrowser">
      <Navbar />
      <DecorBrowser />
      <Footer />
    </div>
  );
};

export default Decor;
