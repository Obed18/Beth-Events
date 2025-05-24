import React from "react";
import "../styles/global.css";
import Navbar from "../components/Navbar";
import Login from "../components/AdminLogin";
import Footer from "../components/Footer";

const Admin = () => {
  return (
    <div className="Admin">
      <Navbar />
      <Login />
      <Footer />
    </div>
  );
};

export default Admin;
