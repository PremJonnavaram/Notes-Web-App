import React from 'react';
import { useNavigate } from "react-router-dom";
import { useMyVariable } from "../../context/email";

import './Home.css';

function Home () {
  const navigateTo = useNavigate();
  const { myVariable } = useMyVariable();
  
  function handleRedirect  () {
    if (myVariable === "") {
      navigateTo("/");
    }else{
      navigateTo("/dashboard");
    }
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Notes App</h1>
      <p className="home-description">
        Organize your thoughts and ideas effortlessly. Create, edit, and manage your notes in one place.
      </p>
      <div className="home-buttons">
        <button className="home-create-button" onClick={handleRedirect}>
          Create a New Note
        </button>
        <button className="home-view-button" onClick={handleRedirect}>
          View My Notes
        </button>
      </div>
    </div>
  );
};

export default Home;
