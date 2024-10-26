import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import logo from "../assets/logo.png"

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Simulate a successful signup process
    setSuccessMessage("Successfully registered!");
    
    // Redirect to homepage after a short delay
    setTimeout(() => {
      navigate('/homepage');
    }, 2000);
  };

  return (
    <div className="signup-container">
        <img src={logo} alt="logo" />
      <h2>Sign Up</h2>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
      </label>
      <label>
        Confirm Password:
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
        />
      </label>
      <button className="signup-button" onClick={handleSignup}>Sign Up</button>
      {successMessage && <div className="success-message">{successMessage}</div>}
    </div>
  );
};

export default Signup;