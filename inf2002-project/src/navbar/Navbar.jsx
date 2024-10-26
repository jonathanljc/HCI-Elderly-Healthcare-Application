import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 
const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/medication">Medication</Link>
      <Link to="/tasks">Tasks</Link>
      <Link to="/calendar">Calendar</Link>
    </nav>
  );
};

export default Navbar;