import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import React from "react";
import styles from "./Textur.module.css"; // Correct import

const Navbar = ({ onPlanetSelect }) => {
  const planets = ["Sun", "Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"];

  return (
    <nav className={`navbar navbar-expand-lg navbar-dark bg-dark ${styles.customNavbar}`}>
      <div className="container-fluid">
        <a className={`navbar-brand ${styles.brand}`} href="#">3Dimensional-Solar</a>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarSupportedContent" 
          aria-controls="navbarSupportedContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" href="#">Home</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                Planets
              </a>
              <ul className="dropdown-menu">
                {planets.map((planet, index) => (
                  <li key={index}>
                    <a className="dropdown-item" href="#" onClick={() => onPlanetSelect(planet)}>
                      {planet}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
          <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search" />
            <button className={`btn btn-outline-success ${styles.searchButton}`}>Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
