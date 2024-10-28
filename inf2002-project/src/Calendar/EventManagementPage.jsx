import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../navbar/Navbar';

const EventManagementPage = () => {
  const [events, setEvents] = useState({});
  const [newEvent, setNewEvent] = useState({ title: '', time: '' });
  const location = useLocation();
  
  const queryParams = new URLSearchParams(location.search);
  const selectedDate = queryParams.get('date');

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events')) || {};
    setEvents(storedEvents);
  }, []);

  const handleCreateEvent = () => {
    const newEventWithId = { ...newEvent, id: Date.now(), joined: false };
    const updatedEvents = {
      ...events,
      [selectedDate]: [...(events[selectedDate] || []), newEventWithId],
    };
    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
    setNewEvent({ title: '', time: '' });
  };

  const handleJoinEvent = (eventId) => {
    const updatedEvents = {
      ...events,
      [selectedDate]: events[selectedDate].map((event) =>
        event.id === eventId ? { ...event, joined: true } : event
      ),
    };
    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
  };

  const selectedEvents = events[selectedDate] || [];

  return (
    <div className="event-management-page">
      <Navbar />
      <header>
        <h1>Events for {selectedDate}</h1>
      </header>
      <main>
        <section className="create-event">
          <h2>Create New Event</h2>
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          />
          <input
            type="time"
            name="time"
            placeholder="Event Time"
            value={newEvent.time}
            onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
          />
          <button onClick={handleCreateEvent}>Create Event</button>
        </section>

        <section className="events">
          <h2>Existing Events</h2>
          {selectedEvents.length > 0 ? (
            <ul>
              {selectedEvents.map((event) => (
                <li key={event.id}>
                  <strong>{event.title}</strong> at {event.time}
                  {!event.joined ? (
                    <button onClick={() => handleJoinEvent(event.id)}>Join</button>
                  ) : (
                    <span> (Joined)</span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>No events for this date.</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default EventManagementPage;
