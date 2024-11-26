// src/components/layout/Layout.jsx
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "@/components/navigation/Navbar";
import { Header } from "@/components/navigation/Header";

export default function Layout() {
  const location = useLocation();

  // Function to get page title based on current route
  const getPageTitle = () => {
    const path = location.pathname;

    // Calendar section titles
    if (path === "/calendar") return "Calendar";
    if (path === "/calendar/new") return "New Event";
    if (path.match(/\/calendar\/\w+\/edit/)) return "Edit Event";
    if (path.match(/\/calendar\/\w+/)) return "Event Details";

    // Medication section titles
    if (path === "/medications") return "Medications";
    if (path === "/medications/new") return "New Medication";
    if (path.match(/\/medications\/\w+\/edit/)) return "Edit Medication";
    if (path.match(/\/medications\/\w+/)) return "Medication Details";

    // Tasks section titles
    if (path === "/tasks") return "Tasks";
    if (path === "/tasks/new") return "New Task";
    if (path.match(/\/tasks\/\w+\/edit/)) return "Edit Task";
    if (path.match(/\/tasks\/\w+/)) return "Task Details";

    // Dashboard
    if (path === "/dashboard") return "Dashboard";

    return "ElderHealth";
  };

  // Show back button on nested routes, hide on main tab routes
  const shouldShowBack = () => {
    const path = location.pathname;
    const mainPaths = ["/dashboard", "/calendar", "/medications", "/tasks"];

    // Show back button if the current path is not a main path
    return !mainPaths.includes(path);
  };

  return (
    <>
      <Header title={getPageTitle()} showBack={shouldShowBack()} />
      {/* Add padding for header and bottom navbar */}
      <main className="pt-14 pb-16 px-4">
        <Outlet />
      </main>
      <Navbar />
    </>
  );
}
