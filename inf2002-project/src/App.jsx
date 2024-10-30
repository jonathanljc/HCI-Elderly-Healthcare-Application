import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import CalendarPage from './Calendar/CalendarPage';
import EventManagementPage from './Calendar/EventManagementPage';
import Homepage from './Homepage/Homepage';
import AddTask from './tasks/AddTask';
import EditTask from './tasks/EditTask';
import TaskList from './tasks/TaskList';
import './tasks/TaskList.css';
import ViewTask from './tasks/ViewTask';
import ForgotPassword from './Auth/ForgotPassword';
import MedicationManagement from "./Medication/MedicationManagement"


const App = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const navigate = useNavigate();

  const addTask = () => {
    navigate('/add-task');
  };

  const editTask = (task) => {
    setCurrentTask(task);
    navigate('/view-task', { state: { task } });
  };

  const saveTask = (task) => {
    if (task.id) {
      setTasks(tasks.map(t => t.id === task.id ? { ...t, ...task } : t));
    } else {
      task.id = new Date().getTime();
      setTasks([...tasks, task]);
    }
    setCurrentTask(null);
    navigate('/');
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    navigate('/');
  };

  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/homepage" element={<Homepage />} />
        <Route path ="/medication-management" element={<MedicationManagement />}/>
        <Route
          path="/tasks"
          element={
            <TaskList
              tasks={tasks}
              onAddTask={addTask}
              onEditTask={editTask}
            />
          }
        />
        <Route
          path="/add-task"
          element={<AddTask onSave={saveTask} />}
        />
        <Route
          path="/edit-task"
          element={
            <EditTask 
              tasks={tasks}
              onSave={saveTask}
            />
          }
        />
        <Route
          path="/view-task"
          element={
            <ViewTask 
              onSave={saveTask} 
              onDelete={deleteTask}
            />
          }
        />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/events" element={<EventManagementPage />} />
      </Routes>
    </div>
  );
};

export default App;
