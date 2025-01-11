import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">GUTWELL </Link>
      <div className="navbar-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/tracker" className="nav-link">Tracker</Link>
        <Link to="/nutrition" className="nav-link">Nutrition</Link>
        <Link to="/treatment" className="nav-link">Treatment</Link>
        <Link to="/education" className="nav-link">Education</Link>
      </div>
    </nav>
  );
}

export default Navbar;
