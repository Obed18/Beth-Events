import React from "react";
import "../styles/global.css";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import FeaturedVenues from "../components/FeaturedVenues";
import ExploreCategories from "../components/ExploreCategories";
import BottomHeroSection from "../components/PlanEventSection";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <Hero />
      <FeaturedVenues />
      <ExploreCategories />
      <BottomHeroSection />
      <Footer />
    </div>
  );
};

export default Home;
