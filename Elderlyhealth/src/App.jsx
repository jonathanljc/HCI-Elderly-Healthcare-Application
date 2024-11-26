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
    <>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Protected Routes */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/medications" element={<MedicationList />} />
          <Route path="/tasks" element={<TaskList />} />
        </Route>

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
