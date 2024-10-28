import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import './CalendarPage.css';

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventDates, setEventDates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events')) || {};
    const allEventDates = Object.keys(storedEvents);
    setEventDates(allEventDates);
  }, []);

  const handleDateClick = (date) => {
    const formattedDate = date.toLocaleDateString('en-CA');

    const storedEvents = JSON.parse(localStorage.getItem('events')) || {};

    if (eventDates.includes(formattedDate)) {
      const eventsForDate = storedEvents[formattedDate] || [];
      navigate(`/events?date=${formattedDate}`, { state: { events: eventsForDate } });
    } else {
      navigate(`/events?date=${formattedDate}`);
    }
  };

  const renderTileContent = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = date.toLocaleDateString('en-CA');
      const storedEvents = JSON.parse(localStorage.getItem('events')) || {};

      const eventsForDate = storedEvents[formattedDate] || [];
      const hasJoinedEvent = eventsForDate.some(event => event.joined);
      const hasUnjoinedEvent = eventsForDate.some(event => !event.joined);

      return (
        <>
          {hasJoinedEvent && <span className="event-indicator">✔️</span>}
          {hasUnjoinedEvent && <span className="event-indicator">❗</span>}
        </>
      );
    }
    return null;
  };

  return (
    <div className="calendar-page">
      <Navbar />
      <header className="calendar-page-header">
        <h1>Event Calendar</h1>
      </header>
      <main className="calendar-page-content">
        <section className="calendar">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            onClickDay={handleDateClick}
            tileContent={renderTileContent}
          />
        </section>

        <section className="calendar-instructions">
          <h2>Instructions</h2>
          <p>Click on a date in the calendar to create an event.</p>
        </section>

        <section className="calendar-legend">
          <h2>Legend</h2>
          <ul>
            <li><span className="event-indicator">✔️</span> - Event Joined</li>
            <li><span className="event-indicator">❗</span> - Event Not Joined</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default CalendarPage;
