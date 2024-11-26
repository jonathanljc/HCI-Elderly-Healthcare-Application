// src/components/navigation/Navbar.jsx
import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, Calendar, Pill, CheckSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: Calendar,
      label: "Calendar",
      path: "/calendar",
    },
    {
      icon: Pill,
      label: "Medications",
      path: "/medications",
    },
    {
      icon: CheckSquare,
      label: "Tasks",
      path: "/tasks",
    },
  ];

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t">
      <nav className="flex items-center justify-around h-16">
        {tabs.map(({ icon: Icon, label, path }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={cn(
              "flex flex-col items-center justify-center flex-1 h-full px-2",
              "transition-colors duration-200",
              isActive(path)
                ? "text-primary"
                : "text-muted-foreground hover:text-primary"
            )}
          >
            <Icon className="h-5 w-5" />
            <span className="text-xs mt-1">{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
