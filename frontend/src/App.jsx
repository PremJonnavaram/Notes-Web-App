import "./App.css";
import React, { useState, useEffect } from "react";
import NavBar from "./components/Reusable/Navbar/Navbar";
import Home from "./components/Global/Home";
import Card from "./components/Landing/Card";
import Dashboard from "./components/Dashboard/Dashboard";
import { Fragment } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login state from localStorage on component mount
  useEffect(() => {
    // This ensures only when mounted it checks for login status
    const thinker = localStorage.getItem("thinker");

    if (thinker) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <Fragment>
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Card setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}
        />
      </Routes>
    </Fragment>
  );
}

export default App;
