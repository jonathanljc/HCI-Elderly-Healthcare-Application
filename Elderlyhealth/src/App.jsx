// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import Dashboard from "@/pages/dashboard/Dashboard";
import CalendarPage from "@/pages/calendar/CalendarPage";
import TaskList from "@/pages/tasks/TaskList";
import MedicationList from "@/pages/medication/MedicationList";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth Routes - No Layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Main App Routes - With Layout */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Calendar Routes */}
          <Route path="/calendar" element={<CalendarPage />} />

          {/* <Route path="/events" element={<EventManagementPage />} /> */}

          {/* Medication Routes */}
          <Route path="/medications" element={<MedicationList />} />
          <Route path="/medications/new" element={<MedicationList />} />
          <Route path="/medications/:id" element={<MedicationList />} />
          <Route path="/medications/:id/edit" element={<MedicationList />} />

          {/* Task Routes */}
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/tasks/new" element={<TaskList />} />
          <Route path="/tasks/:id" element={<TaskList />} />
          <Route path="/tasks/:id/edit" element={<TaskList />} />
        </Route>

        {/* Catch-all route - redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
