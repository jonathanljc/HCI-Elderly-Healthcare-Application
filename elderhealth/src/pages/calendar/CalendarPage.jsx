import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { EventSheet } from "@/components/calendar/EventSheet";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CalendarPage() {
  const [date, setDate] = useState(new Date());
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [events, setEvents] = useState({});

  // Load events from localStorage on mount
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || {};
    setEvents(storedEvents);
  }, []);

  const handleDateSelect = (selectedDate) => {
    setDate(selectedDate);
    setIsSheetOpen(true);
  };

  const getEventsForDate = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    return events[formattedDate] || [];
  };

  const handleCreateEvent = (newEvent) => {
    const formattedDate = format(newEvent.date, "yyyy-MM-dd");
    const updatedEvents = {
      ...events,
      [formattedDate]: [...(events[formattedDate] || []), newEvent],
    };
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  const handleJoinEvent = (eventId) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    const updatedEvents = {
      ...events,
      [formattedDate]: events[formattedDate].map((event) =>
        event.id === eventId ? { ...event, joined: true } : event
      ),
    };
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  return (
    <div className="space-y-6 max-w-md mx-auto pb-16">
      <h2 className="text-2xl font-bold">Event Calendar</h2>

      {/* Instructions Card */}
      <Card className="bg-muted/50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div className="space-y-2 text-muted-foreground">
              <p className="font-medium text-base">How to Use the Calendar:</p>
              <ul className="space-y-1.5 text-sm">
                <li className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  <span>Tap any date to see or add events</span>
                </li>
                <li className="flex gap-2 items-center">
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <span>Green dots show events you've joined</span>
                </li>
                <li className="flex gap-2 items-center">
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <span>Yellow dots show events you can join</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-lg border bg-card p-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          className="p-3"
          components={{
            DayContent: ({ date: dayDate, ...props }) => {
              const dateEvents = getEventsForDate(dayDate);
              const hasJoinedEvent = dateEvents.some((event) => event.joined);
              const hasUnjoinedEvent = dateEvents.some(
                (event) => !event.joined
              );

              return (
                <div
                  className="relative w-full h-full flex flex-col items-center hover:bg-accent/50 rounded-md transition-colors cursor-pointer p-1"
                  role="button"
                  aria-label={`Select ${format(dayDate, "MMMM do, yyyy")}`}
                >
                  <span className="text-base font-medium">
                    {format(dayDate, "d")}
                  </span>
                  <div className="flex gap-1 mt-1">
                    {hasJoinedEvent && (
                      <div
                        className="h-2 w-2 rounded-full bg-green-500"
                        aria-label="Joined events"
                      />
                    )}
                    {hasUnjoinedEvent && (
                      <div
                        className="h-2 w-2 rounded-full bg-yellow-500"
                        aria-label="Available events"
                      />
                    )}
                  </div>
                </div>
              );
            },
          }}
          classNames={{
            months:
              "w-full flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
            month: "space-y-4 w-full",
            caption:
              "flex justify-center pt-1 relative items-center text-base font-medium",
            caption_label: "text-base", // Increased text size
            nav: "space-x-1 flex items-center",
            nav_button:
              "h-9 w-9 bg-transparent p-0 opacity-50 hover:opacity-100 hover:bg-muted", // Larger nav buttons
            nav_button_previous: "absolute left-1",
            nav_button_next: "absolute right-1",
            table: "w-full border-collapse",
            head_row: "flex w-full",
            head_cell: "text-muted-foreground font-medium text-sm w-10 h-10", // Increased size
            row: "flex w-full mt-2",
            cell: cn(
              "relative p-0 text-center text-base focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent",
              "h-10 w-10" // Increased touch targets
            ),
            day: cn(
              "h-10 w-10 p-0 font-normal text-base", // Increased text size
              "hover:bg-accent rounded-md transition-colors",
              "aria-selected:opacity-100"
            ),
            day_selected:
              "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
            day_today: "bg-accent text-accent-foreground font-bold",
            day_outside: "text-muted-foreground opacity-50",
            day_disabled: "text-muted-foreground opacity-50",
            day_hidden: "invisible",
          }}
        />
      </div>

      <EventSheet
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        selectedDate={date}
        events={getEventsForDate(date)}
        onJoinEvent={handleJoinEvent}
        onCreateEvent={handleCreateEvent}
      />
    </div>
  );
}
