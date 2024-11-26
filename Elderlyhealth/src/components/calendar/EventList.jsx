import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const EventList = ({ events = [], onEventClick }) => {
  // Group events by date
  const groupedEvents = events.reduce((groups, event) => {
    const date = new Date(event.date).toLocaleDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(event);
    return groups;
  }, {});

  return (
    <div className="space-y-4">
      {Object.entries(groupedEvents).map(([date, dateEvents]) => (
        <div key={date} className="space-y-2">
          <h3 className="font-medium text-sm text-muted-foreground">
            {new Date(date).toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </h3>
          <div className="space-y-2">
            {dateEvents.map((event) => (
              <Card
                key={event.id}
                className="cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => onEventClick(event)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{event.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {event.description}
                      </p>
                    </div>
                    <Badge
                      variant={
                        event.type === "appointment" ? "default" : "secondary"
                      }
                    >
                      {event.type}
                    </Badge>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    {new Date(event.date).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventList;
