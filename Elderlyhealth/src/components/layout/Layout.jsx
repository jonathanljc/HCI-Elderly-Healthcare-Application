// src/components/layout/Layout.jsx
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "@/components/navigation/Navbar";
import { Header } from "@/components/navigation/Header";
import { useEffect, useState } from "react";

export default function Layout() {
  const location = useLocation();
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const pos = window.scrollY;
      setScrollPosition(pos);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/calendar") return "Calendar";
    if (path === "/calendar/new") return "New Event";
    if (path.match(/\/calendar\/\w+\/edit/)) return "Edit Event";
    if (path.match(/\/calendar\/\w+/)) return "Event Details";
    if (path === "/medications") return "Medications";
    if (path === "/medications/new") return "New Medication";
    if (path.match(/\/medications\/\w+\/edit/)) return "Edit Medication";
    if (path.match(/\/medications\/\w+/)) return "Medication Details";
    if (path === "/tasks") return "Tasks";
    if (path === "/tasks/new") return "New Task";
    if (path.match(/\/tasks\/\w+\/edit/)) return "Edit Task";
    if (path.match(/\/tasks\/\w+/)) return "Task Details";
    if (path === "/dashboard") return "Dashboard";
    return "ElderHealth";
  };

  const shouldShowBack = () => {
    const path = location.pathname;
    const mainPaths = ["/dashboard", "/calendar", "/medications", "/tasks"];
    return !mainPaths.includes(path);
  };

  return (
    <div className="relative min-h-screen bg-background">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10">
        <div className="grid-background" />
        <div className="background-glow" />

        {/* Accent Decorations */}
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] transform translate-x-1/2 -translate-y-1/2"
          style={{
            transform: `translate(50%, -50%) translateY(${
              scrollPosition * 0.2
            }px)`,
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] transform -translate-x-1/2 translate-y-1/2"
          style={{
            transform: `translate(-50%, 50%) translateY(${
              -scrollPosition * 0.2
            }px)`,
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <Header title={getPageTitle()} showBack={shouldShowBack()} />
        <main className="pt-14 pb-20">
          <div className="px-4 max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Navbar - No blur effect */}
      <Navbar />
    </div>
  );
}
