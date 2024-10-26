import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router> {/* Wrap App with Router */}
      <App />
    </Router>
  </StrictMode>,
);
