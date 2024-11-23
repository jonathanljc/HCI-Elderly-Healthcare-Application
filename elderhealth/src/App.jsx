// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import { cn } from "./lib/utils";

// Temporary Dashboard component
const Dashboard = () => (
  <div className="min-h-screen bg-background p-8">
    <h1 className="text-2xl font-bold">Dashboard</h1>
    <p>Welcome to ElderHealth!</p>
  </div>
);

function App() {
  return (
    <div className={cn("min-h-screen bg-background font-sans antialiased")}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;
