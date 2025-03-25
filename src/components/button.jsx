import React from "react";
import styles from "./button.module.css";

const button = ({ planet, description, onClose }) => {
  if (!planet) return null;

  return (
    <div className={styles.infoBox}>
      <h2>{planet}</h2>
      <h2>{planet} this is the planet in the solar system of our galaxy</h2>
      <p>{description}</p>
      <button onClick={onClose} className={styles.closeButton}>Close</button>
    </div>
  );
};

export default button;
