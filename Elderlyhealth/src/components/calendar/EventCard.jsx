// src/components/calendar/EventCard.jsx
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin } from "lucide-react";

export function EventCard({ event, onClick }) {
  const getEventTypeColor = (type) => {
    const types = {
      medical: "bg-blue-100 text-blue-800",
      therapy: "bg-green-100 text-green-800",
      test: "bg-purple-100 text-purple-800",
      default: "bg-gray-100 text-gray-800",
    };
    return types[type] || types.default;
  };

  return (
    <Card
      className="hover:bg-accent cursor-pointer transition-colors"
      onClick={() => onClick?.(event)}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{event.title}</h3>
              <Badge className={getEventTypeColor(event.type)}>
                {event.type}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar size={12} />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={12} />
                <span>{event.time}</span>
              </div>
              {event.location && (
                <div className="flex items-center gap-1">
                  <MapPin size={12} />
                  <span>{event.location}</span>
                </div>
              )}
            </div>
          </div>
          {event.joined && (
            <Badge variant="success" className="ml-2">
              Joined
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
