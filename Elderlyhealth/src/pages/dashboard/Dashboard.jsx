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
  AlertCircle,
} from "lucide-react";
import { Navbar } from "@/components/navigation/Navbar";
import { Badge } from "@/components/ui/badge";
import {
  format,
  isToday,
  isTomorrow,
  isPast,
  isWithinInterval,
  addDays,
} from "date-fns";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const StatCard = ({ title, value, description, icon: Icon, trend }) => {
  return (
    <Card className="relative overflow-hidden group hover:shadow-soft transition-shadow">
      <div className="absolute top-0 right-0 w-24 h-24 transform translate-x-8 -translate-y-8">
        <div className="absolute inset-0 bg-primary/5 rounded-full blur-2xl" />
      </div>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">
                {title}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold tracking-tight">{value}</p>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const MedicationStatusCard = ({ medication }) => {
  const getStatusStyles = () => {
    const today = new Date();
    const startDate = new Date(medication.startDate);
    const endDate = medication.endDate ? new Date(medication.endDate) : null;

    if (today < startDate) {
      return {
        badge: <Badge variant="secondary">Starting Soon</Badge>,
        indicator: "bg-yellow-500",
      };
    } else if (endDate && today > endDate) {
      return {
        badge: <Badge variant="outline">Completed</Badge>,
        indicator: "bg-gray-400",
      };
    }
    return {
      badge: <Badge variant="success">Active</Badge>,
      indicator: "bg-green-500",
    };
  };

  const styles = getStatusStyles();

  return (
    <div className="group relative rounded-lg border bg-card p-4 hover:shadow-soft transition-all duration-200">
      <div className="flex items-start gap-3">
        <div
          className={`h-2 w-2 rounded-full mt-2 ${styles.indicator} animate-pulse-gentle`}
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-medium">{medication.name}</h3>
            {styles.badge}
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {medication.dosage} • {medication.frequency}
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          {format(new Date(medication.startDate), "MMM d, yyyy")}
        </div>
      </div>
      <div
        className="absolute inset-0 rounded-lg bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-hidden="true"
      />
    </div>
  );
};

const TaskCard = ({ task }) => {
  const getPriorityStyles = (priority) => {
    const styles = {
      high: {
        badge: "bg-red-100 text-red-800",
        indicator: "bg-red-500",
      },
      medium: {
        badge: "bg-yellow-100 text-yellow-800",
        indicator: "bg-yellow-500",
      },
      low: {
        badge: "bg-green-100 text-green-800",
        indicator: "bg-green-500",
      },
    };
    return styles[priority] || styles.medium;
  };

  const styles = getPriorityStyles(task.priority);
  const isOverdue =
    isPast(new Date(task.dueDate)) && task.status !== "completed";

  return (
    <div className="group relative rounded-lg border bg-card p-4 hover:shadow-soft transition-all duration-200">
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <div
            className={`h-2 w-2 rounded-full mt-2 ${styles.indicator} animate-pulse-gentle`}
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{task.title}</h3>
              <Badge className={styles.badge}>{task.priority}</Badge>
              {task.status === "completed" && (
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  Completed
                </Badge>
              )}
              {isOverdue && <Badge variant="destructive">Overdue</Badge>}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Due: {format(new Date(task.dueDate), "MMM d, yyyy")}
            </p>
          </div>
        </div>
      </div>
      <div
        className="absolute inset-0 rounded-lg bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-hidden="true"
      />
    </div>
  );
};

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
    <Card className="group hover:shadow-soft transition-all duration-200">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <div className={`p-2 rounded-lg ${styles.bg} ${styles.text}`}>
              <Icon className="h-4 w-4" aria-hidden="true" />
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
            <Badge variant="outline" className="bg-green-50 text-green-700">
              Joined
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const EmptyStatePlaceholder = ({ type }) => {
  const content = {
    events: {
      icon: CalendarDays,
      title: "No Events Scheduled",
      description: "Start planning your activities and appointments",
      actionLabel: "Add Event",
      features: [
        { color: "bg-blue-500", label: "Track medical appointments" },
        { color: "bg-green-500", label: "Schedule exercise routines" },
        { color: "bg-purple-500", label: "Set health checkups" },
      ],
    },
    medications: {
      icon: Pill,
      title: "No Medications Added",
      description: "Keep track of your medications and schedules",
      actionLabel: "Add Medication",
      features: [
        { color: "bg-blue-500", label: "Track daily medications" },
        { color: "bg-green-500", label: "Set medication reminders" },
        { color: "bg-purple-500", label: "Monitor medication schedules" },
      ],
    },
    tasks: {
      icon: CheckSquare,
      title: "No Tasks Created",
      description: "Create tasks to manage your health activities",
      actionLabel: "Add Task",
      features: [
        { color: "bg-blue-500", label: "Track health routines" },
        { color: "bg-green-500", label: "Set activity reminders" },
        { color: "bg-purple-500", label: "Monitor daily progress" },
      ],
    },
  };

  const {
    icon: Icon,
    title,
    description,
    actionLabel,
    features,
  } = content[type];

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center space-y-4">
      <div className="relative">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted/10">
          <Icon
            className="h-8 w-8 text-muted-foreground/40"
            aria-hidden="true"
          />
        </div>
        <Sparkles
          className="h-6 w-6 text-primary absolute -top-2 -right-2 animate-pulse-gentle"
          aria-hidden="true"
        />
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-muted-foreground max-w-[250px]">
          {description}
        </p>
      </div>

      <div className="pt-2 space-y-2.5">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <div
              className={`h-2 w-2 rounded-full ${feature.color} animate-pulse-gentle`}
              aria-hidden="true"
            />
            <span>{feature.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [medications, setMedications] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    joined: 0,
    upcoming: 0,
    activeMedications: 0,
    pendingTasks: 0,
    overdueTasks: 0,
  });

  useEffect(() => {
    // Load data from localStorage
    const storedEvents = JSON.parse(localStorage.getItem("events")) || {};
    const storedMedications =
      JSON.parse(localStorage.getItem("medications")) || [];
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Process events
    const allEvents = Object.entries(storedEvents).flatMap(
      ([date, dateEvents]) =>
        dateEvents.map((event) => ({
          ...event,
          date,
        }))
    );

    const sortedEvents = allEvents.sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateA - dateB;
    });

    const upcomingEvents = sortedEvents.filter(
      (event) => !isPast(new Date(`${event.date} ${event.time}`))
    );

    // Count active medications
    const today = new Date();
    const activeMedicationCount = storedMedications.filter((med) => {
      const startDate = new Date(med.startDate);
      const endDate = med.endDate ? new Date(med.endDate) : addDays(today, 365);
      return isWithinInterval(today, { start: startDate, end: endDate });
    }).length;

    // Process tasks
    const pendingTasks = storedTasks.filter(
      (task) => task.status !== "completed"
    );
    const overdueTasks = pendingTasks.filter((task) =>
      isPast(new Date(task.dueDate))
    );

    // Sort tasks by due date and status
    const sortedTasks = storedTasks.sort((a, b) => {
      if (a.status === "completed" && b.status !== "completed") return 1;
      if (a.status !== "completed" && b.status === "completed") return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    });

    setEvents(upcomingEvents);
    setMedications(storedMedications);
    setTasks(sortedTasks);
    setStats({
      total: allEvents.length,
      joined: allEvents.filter((event) => event.joined).length,
      upcoming: upcomingEvents.length,
      activeMedications: activeMedicationCount,
      pendingTasks: pendingTasks.length,
      overdueTasks: overdueTasks.length,
    });
  }, []);

  const dashboardStats = [
    {
      title: "Total Events",
      value: stats.total.toString(),
      description: `${stats.joined} joined, ${stats.upcoming} upcoming`,
      icon: Calendar,
      trend: "up",
    },
    {
      title: "Active Medications",
      value: stats.activeMedications.toString(),
      description: `${medications.length} total medications`,
      icon: Pill,
      trend: "neutral",
    },
    {
      title: "Tasks",
      value: `${stats.pendingTasks}`,
      description: `${stats.overdueTasks} overdue tasks`,
      icon: CheckSquare,
      trend: stats.overdueTasks > 0 ? "down" : "up",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex-1 space-y-6 p-4 pt-6 md:p-8">
        {/* Stats Overview */}
        <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-3">
          {dashboardStats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              description={stat.description}
              icon={stat.icon}
              trend={stat.trend}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Events Card */}
          <Card className="lg:col-span-1 overflow-hidden group hover:shadow-soft transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="font-medium">Upcoming Events</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/calendar")}
                className="text-sm group"
              >
                View Calendar
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </CardHeader>
            <CardContent>
              {events.length > 0 ? (
                <div className="space-y-3">
                  {events.slice(0, 3).map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <EmptyStatePlaceholder type="events" />
              )}
            </CardContent>
          </Card>

          {/* Medications Card */}
          <Card className="lg:col-span-1 overflow-hidden group hover:shadow-soft transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="font-medium">Current Medications</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/medications")}
                className="text-sm group"
              >
                Manage Medications
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </CardHeader>
            <CardContent>
              {medications.length > 0 ? (
                <div className="space-y-3">
                  {medications.slice(0, 3).map((medication) => (
                    <MedicationStatusCard
                      key={medication.id}
                      medication={medication}
                    />
                  ))}
                </div>
              ) : (
                <EmptyStatePlaceholder type="medications" />
              )}
            </CardContent>
          </Card>

          {/* Tasks Card */}
          <Card className="lg:col-span-1 overflow-hidden group hover:shadow-soft transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="font-medium">Tasks</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/tasks")}
                className="text-sm group"
              >
                View All Tasks
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </CardHeader>
            <CardContent>
              {tasks.length > 0 ? (
                <div className="space-y-3">
                  {tasks.slice(0, 3).map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              ) : (
                <EmptyStatePlaceholder type="tasks" />
              )}
            </CardContent>
          </Card>
        </div>

        <div className="h-16 md:hidden" aria-hidden="true" />
      </main>
    </div>
  );
}
