import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Pill,
  Calendar,
  CheckSquare,
  Plus,
  ArrowRight,
  Sparkles,
  Clock,
  CalendarClock,
  PartyPopper,
  CalendarDays,
} from "lucide-react";
import { Navbar } from "@/components/navigation/Navbar";
import { Badge } from "@/components/ui/badge";
import { format, isToday, isTomorrow, isPast } from "date-fns";
import { useNavigate } from "react-router-dom";

const NoEventsPlaceholder = () => (
  <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
    <div className="relative">
      <CalendarDays className="h-16 w-16 text-muted-foreground/20" />
      <Sparkles className="h-6 w-6 text-primary absolute -top-2 -right-2 animate-pulse" />
    </div>
    <div className="space-y-2">
      <h3 className="font-semibold text-xl">No Events Yet!</h3>
      <p className="text-sm text-muted-foreground max-w-[250px]">
        Start planning your activities by adding your first event to the
        calendar
      </p>
    </div>
    <div className="pt-4 space-y-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <div className="h-2 w-2 rounded-full bg-green-500" />
        <span>Track medical appointments</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <div className="h-2 w-2 rounded-full bg-blue-500" />
        <span>Schedule exercise routines</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <div className="h-2 w-2 rounded-full bg-purple-500" />
        <span>Set medication reminders</span>
      </div>
    </div>
  </div>
);

const EventCard = ({ event }) => {
  const getEventTypeStyles = (type) => {
    const types = {
      medical: {
        bg: "bg-blue-100",
        text: "text-blue-800",
        icon: Clock,
      },
      exercise: {
        bg: "bg-green-100",
        text: "text-green-800",
        icon: CalendarClock,
      },
      medication: {
        bg: "bg-purple-100",
        text: "text-purple-800",
        icon: Pill,
      },
      general: {
        bg: "bg-orange-100",
        text: "text-orange-800",
        icon: PartyPopper,
      },
    };
    return types[type] || types.general;
  };

  const styles = getEventTypeStyles(event.type);
  const Icon = styles.icon;
  const eventDate = new Date(event.date);

  const getDateLabel = () => {
    if (isToday(eventDate)) return "Today";
    if (isTomorrow(eventDate)) return "Tomorrow";
    return format(eventDate, "MMM d");
  };

  return (
    <Card className="group hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <div className={`p-2 rounded-lg ${styles.bg} ${styles.text}`}>
              <Icon className="h-4 w-4" />
            </div>
            <div>
              <h4 className="font-medium text-sm">{event.title}</h4>
              <div className="flex items-center gap-2 mt-1">
                <time className="text-xs text-muted-foreground">
                  {getDateLabel()} at {event.time}
                </time>
                <Badge
                  variant="secondary"
                  className={`${styles.bg} ${styles.text} text-xs`}
                >
                  {event.type}
                </Badge>
              </div>
            </div>
          </div>
          {event.joined && (
            <Badge
              variant="outline"
              className="bg-green-50 text-green-700 border-green-200"
            >
              Joined
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    joined: 0,
    upcoming: 0,
  });

  useEffect(() => {
    // Load events from localStorage
    const storedEvents = JSON.parse(localStorage.getItem("events")) || {};

    // Convert the object of arrays into a flat array of events with dates
    const allEvents = Object.entries(storedEvents).flatMap(
      ([date, dateEvents]) =>
        dateEvents.map((event) => ({
          ...event,
          date,
        }))
    );

    // Sort events by date and time
    const sortedEvents = allEvents.sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateA - dateB;
    });

    const upcomingEvents = sortedEvents.filter(
      (event) => !isPast(new Date(`${event.date} ${event.time}`))
    );

    setEvents(upcomingEvents);
    setStats({
      total: allEvents.length,
      joined: allEvents.filter((event) => event.joined).length,
      upcoming: upcomingEvents.length,
    });
  }, []);

  const dashboardStats = [
    {
      title: "Total Events",
      value: stats.total.toString(),
      description: `${stats.joined} joined, ${stats.upcoming} upcoming`,
      icon: Calendar,
    },
    {
      title: "Next Event",
      value: events.length ? format(new Date(events[0]?.date), "MMM d") : "-",
      description: events.length ? events[0]?.title : "No upcoming events",
      icon: ArrowRight,
    },
    {
      title: "Event Types",
      value: events.length
        ? [...new Set(events.map((e) => e.type))].length.toString()
        : "0",
      description: "Different types of activities",
      icon: Sparkles,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex-1 space-y-6 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Welcome Back!</h1>
            <p className="text-muted-foreground">
              Here&apos;s your health summary for today
            </p>
          </div>
          <Button onClick={() => navigate("/calendar")}>
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {dashboardStats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="font-medium">Upcoming Events</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/calendar")}
              className="text-sm"
            >
              View Calendar
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            {events.length > 0 ? (
              <div className="space-y-3">
                {events.slice(0, 5).map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <NoEventsPlaceholder />
            )}
          </CardContent>
        </Card>

        <div className="h-16 md:hidden" />
      </main>
    </div>
  );
}
