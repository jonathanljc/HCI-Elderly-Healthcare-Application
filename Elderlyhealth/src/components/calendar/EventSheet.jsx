// src/components/calendar/EventSheet.jsx
import { format } from "date-fns";
import { PlusCircle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { EventForm } from "./EventForm";

export function EventSheet({
  isOpen,
  onOpenChange,
  selectedDate,
  events = [],
  onJoinEvent,
  onCreateEvent,
}) {
  const [showEventDialog, setShowEventDialog] = useState(false);

  const handleEventSubmit = (eventData) => {
    onCreateEvent({
      ...eventData,
      id: Date.now(),
      joined: false,
      date: selectedDate,
    });
    setShowEventDialog(false);
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetContent side="bottom" className="h-[400px]">
          <SheetHeader>
            <SheetTitle>
              Events for {format(selectedDate, "EEEE, MMMM do, yyyy")}
            </SheetTitle>
          </SheetHeader>

          <div className="mt-6 flex-1 overflow-y-auto">
            {events?.length > 0 ? (
              <div className="space-y-3">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="p-4 border rounded-lg bg-card hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-base">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {event.time}
                        </p>
                        {event.type && (
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                            {event.type}
                          </span>
                        )}
                      </div>
                      {event.joined ? (
                        <Check className="h-5 w-5 text-green-500" />
                      ) : (
                        <Button size="sm" onClick={() => onJoinEvent(event.id)}>
                          Join
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">
                No events for this date
              </p>
            )}
          </div>

          <SheetFooter className="mt-4">
            <Button
              onClick={() => setShowEventDialog(true)}
              className="w-full h-12 text-base"
              size="lg"
            >
              <PlusCircle className="mr-2 h-5 w-5" />
              Create New Event
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Event</DialogTitle>
          </DialogHeader>
          <EventForm
            onSubmit={handleEventSubmit}
            onCancel={() => setShowEventDialog(false)}
            initialDate={selectedDate}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
