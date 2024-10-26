// src/Homepage/Homepage.jsx
import React from 'react';
import Navbar from '../navbar/Navbar'; // Import the Navbar component


const Homepage = () => {
  return (
    <div className="homepage">
      <Navbar />
      <header className="homepage-header">
        <h1>Welcome to Elderhealth</h1>
      </header>
      <main className="homepage-content">
        <section className="summary">
          <div className="summary-item">
            <h3>Tasks</h3>
            <p>Manage your daily tasks efficiently.</p>
          </div>
          <div className="summary-item">
            <h3>Medication</h3>
            <p>Keep track of your medication schedules.</p>
          </div>
          <div className="summary-item">
            <h3>Events</h3>
            <p>Stay updated with upcoming events and appointments.</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Homepage;