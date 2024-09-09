import React from 'react';
import { useNavigate } from "react-router-dom";
import { useMyVariable } from "../../context/email";
import styles from './Home.module.css';

function Home() {
  const navigateTo = useNavigate();
  const { myVariable } = useMyVariable();
  
  function handleRedirect() {
    if (myVariable === "") {
      navigateTo("/");
    } else {
      navigateTo("/dashboard");
    }
  }

  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.homeTitle}>Welcome to Notes App</h1>
      <p className={styles.homeDescription}>
        Organize your thoughts and ideas effortlessly. Create, edit, and manage your notes in one place.
      </p>
      <div className={styles.homeButtons}>
        <button className={styles.homeCreateButton} onClick={handleRedirect}>
          Create a New Note
        </button>
        <button className={styles.homeViewButton} onClick={handleRedirect}>
          View My Notes
        </button>
      </div>
    </div>
  );
}

export default Home;
