// src/Homepage/Homepage.jsx
import React from 'react';
import './Login.css';
import logo from "../assets/logo.png"
import { useNavigate } from 'react-router';
const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/homepage")
  }

  const handleSignup = () => {
    navigate("/signup")
  }
  const handleForgotPassword = () => {
    navigate("/forgot-password")
  }
  return (
    <div className="homepage">
      <header className="homepage-header">
        <img src={logo} alt="Logo" className="homepage-logo" />
        <h1>Elderhealth</h1>
      </header>
      <main className="homepage-content">
        <div className="login-form">
          <label>
            Username:&nbsp;
            <input type="text" placeholder="Enter your username" />
          </label>
          <label>
            Password:&nbsp;
            <input type="password" placeholder="Enter your password" />
          </label>
          <div className="button-group">
            <button className="login-button" onClick={handleLogin}>Login</button>
            <button className="forgot-password-button" onClick={handleForgotPassword}>Forgot Password?</button>
            <button className="signup-button" onClick={handleSignup}>Sign Up</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;