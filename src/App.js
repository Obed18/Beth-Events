import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Venue from "./pages/Venue";
import Admin from "./pages/Admin";
import Decor from "./pages/Decor";
import Lighting from "./pages/Lighting";
import Catering from "./pages/Catering";
import Administrator from "./pages/Administrator";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/venue" element={<Venue />} />
        <Route path="/admin/login" element={<Admin />} />
        <Route path="/admin" element={<Administrator />} />
        <Route path="/decor" element={<Decor />} />
        <Route path="/lighting" element={<Lighting />} />
        <Route path="/catering" element={<Catering />} />
      </Routes>
    </Router>
  );
};

export default App;
