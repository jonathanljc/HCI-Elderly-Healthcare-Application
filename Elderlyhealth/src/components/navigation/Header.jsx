// src/components/navigation/Header.jsx
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header({ title, showBack = true }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine parent route for nested pages
  const handleBack = () => {
    const path = location.pathname;
    // Calendar section routes
    if (path.includes("/calendar/")) {
      navigate("/calendar");
      return;
    }
    // Medication section routes
    if (path.includes("/medications/")) {
      navigate("/medications");
      return;
    }
    // Tasks section routes
    if (path.includes("/tasks/")) {
      navigate("/tasks");
      return;
    }
    // Default back navigation for other cases
    navigate(-1);
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b z-50">
      <div className="flex items-center justify-between h-full px-4">
        <div className="w-10">
          {showBack && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="hover:bg-transparent"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          )}
        </div>
        <h1 className="font-semibold text-lg">{title}</h1>
        <div className="w-10" /> {/* Spacer for balance */}
      </div>
    </header>
  );
}
