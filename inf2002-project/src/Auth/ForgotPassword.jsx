// src/Auth/ForgotPassword.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css'; 

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = () => {
    // Simulate a password reset process
    if (email) {
      setSuccessMessage("Password reset link sent to your email!");
      
      // Redirect to login page after a short delay
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } else {
      alert("Please enter your email address.");
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </label>
      <button className="reset-button" onClick={handleResetPassword}>Reset Password</button>
      {successMessage && <div className="success-message">{successMessage}</div>}
    </div>
  );
};

export default ForgotPassword;