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
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-t">
      <nav className="flex items-center justify-around h-16 max-w-md mx-auto">
        {tabs.map(({ icon: Icon, label, path }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={cn(
              "flex flex-col items-center justify-center flex-1 h-full px-2",
              "transition-all duration-200 hover:bg-accent/10 active:scale-95",
              isActive(path)
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
            aria-label={label}
            role="link"
            aria-current={isActive(path) ? "page" : undefined}
          >
            <Icon className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">{label}</span>

            {/* Active indicator */}
            {isActive(path) && (
              <span className="absolute bottom-0 left-1/2 h-0.5 w-12 -translate-x-1/2 rounded-t-full bg-primary" />
            )}
          </button>
        ))}
      </nav>
    </div>
  );
}
