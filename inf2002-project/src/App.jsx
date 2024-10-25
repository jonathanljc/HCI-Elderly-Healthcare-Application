import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import TaskList from './tasks/TaskList';
import TaskDetail from './tasks/TaskDetail';
import AddTask from './tasks/AddTask';
import EditTask from './tasks/EditTask';
import ViewTask from './tasks/ViewTask'; // Import the new ViewTask component
import './tasks/TaskList.css';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const navigate = useNavigate();

  const addTask = () => {
    navigate('/add-task');
  };

  const editTask = (task) => {
    setCurrentTask(task);
    navigate('/view-task', { state: { task } }); // Navigate to ViewTask for editing
  };

  const saveTask = (task) => {
    // Check if the task has an `id`
    if (task.id) {
      // Update existing task
      setTasks(tasks.map(t => t.id === task.id ? { ...t, ...task } : t));
    } else {
      // Add a new task if it's a new entry
      task.id = new Date().getTime();
      setTasks([...tasks, task]);
    }
    setCurrentTask(null); // Reset current task
    navigate('/'); // Navigate back to task list
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    navigate('/'); // Navigate back to task list
  };

  return (
    <div className="app-container">
      <Routes>
        <Route
          path="/"
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
          path="/task-detail"
          element={
            <TaskDetail
              task={currentTask}
              onDelete={deleteTask}
              onEdit={() => editTask(currentTask)}
              onBack={() => navigate('/')}
            />
          }
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
      </Routes>
    </div>
  );
};

export default App;
