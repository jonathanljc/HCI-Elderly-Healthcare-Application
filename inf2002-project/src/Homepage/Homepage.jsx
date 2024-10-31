import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Homepage.css';
import Navbar from '../navbar/Navbar';
const Homepage = () => {
  // Mock data
  const medications = [
    { id: 1, name: "Lisinopril", dosage: "10mg", time: "8:00 AM", instructions: "Take with food" },
    { id: 2, name: "Metformin", dosage: "500mg", time: "2:00 PM", instructions: "After lunch" },
    { id: 3, name: "Vitamin D", dosage: "1000IU", time: "9:00 AM", instructions: "With breakfast" }
  ];

  const tasks = [
    { id: 1, task: "Blood pressure reading", time: "10:00 AM", completed: false },
    { id: 2, task: "30 minute walk", time: "5:00 PM", completed: true },
    { id: 3, task: "Call Dr. Smith's office", time: "2:30 PM", completed: false }
  ];

  const events = [
    { id: 1, title: "Cardiology Appointment", date: "Nov 1", time: "9:30 AM", location: "Heart Center" },
    { id: 2, title: "Physical Therapy", date: "Nov 3", time: "2:00 PM", location: "Wellness Clinic" },
    { id: 3, title: "Lab Work", date: "Nov 5", time: "11:00 AM", location: "Medical Lab" }
  ];

  return (
    <div className="homepage">
      <Navbar/>
      <header className="homepage-header">
        <h1>Welcome to Elderhealth</h1>
        <p>Your daily health dashboard</p>
      </header>

      <main className="dashboard">
        {/* Medications Card */}
        <div className="card medications">
          <div className="card-header">
            <h2>
            <i className="fa-solid fa-pills"> </i>
            Today&apos;s Medications
            </h2>
          </div>
          <div className="card-content">
            {medications.map(med => (
              <div key={med.id} className="medication-item">
                <div className="medication-info">
                  <h3>{med.name} - {med.dosage}</h3>
                  <div className="time-info">
                  <i className="fa-solid fa-clock-rotate-left"><span>&nbsp;&nbsp;{med.time}</span></i>
                  </div>
                  <p className="instructions">{med.instructions}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tasks Card */}
        <div className="card tasks">
          <div className="card-header">
            <h2>
            <i className="fa-solid fa-heart"></i>
            Today&apos;s Tasks
            </h2>
          </div>
          <div className="card-content">
            {tasks.map(task => (
              <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  className="task-checkbox"
                  readOnly
                />
                <div className="task-info">
                  <p className="task-name">{task.task}</p>
                  <p className="task-time">{task.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Events Card */}
        <div className="card events">
          <div className="card-header">
            <h2>
            <i className="fa-regular fa-calendar"></i>
              Upcoming Events
            </h2>
          </div>
          <div className="card-content">
            {events.map(event => (
              <div key={event.id} className="event-item">
                <div className="event-info">
                  <h3>{event.title}</h3>
                  <p className="event-date">{event.date} at {event.time}</p>
                  <p className="event-location">{event.location}</p>
                </div>
                <i className="fa-regular fa-bell"></i>
              </div>
            ))}
          </div>
        </div>
      </main>

    </div>
  );
};

export default Homepage;