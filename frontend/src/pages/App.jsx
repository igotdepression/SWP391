import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeMenu from "./HomeMenu";
import About from "./About";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomeMenu />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;