import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import TaskList from './tasks/TaskList';
import TaskDetail from './tasks/TaskDetail';
import AddTask from './tasks/AddTask';
import EditTask from './tasks/EditTask';
import './tasks/TaskList.css';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const navigate = useNavigate();

  // Function to navigate to Add Task page
  const addTask = () => navigate('/add-task');

  // Function to navigate to Edit Task page with a specific task
  const editTask = (task) => {
    setCurrentTask(task);
    navigate('/edit-task', { state: { task } }); // Pass task info to EditTask
  };

  // Function to view Task Details
  const viewTask = (task) => {
    setCurrentTask(task);
    navigate('/task-detail');
  };

  // Function to save a new or edited task
  const saveTask = (task) => {
    if (task.id) {
      // Update existing task
      setTasks(tasks.map(t => (t.id === task.id ? task : t)));
    } else {
      // Add new task
      task.id = new Date().getTime();
      setTasks([...tasks, task]);
    }
    navigate('/'); // Navigate back to task list after saving
  };

  // Function to delete a task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    navigate('/'); // Navigate back to task list after deletion
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
              onViewTask={viewTask}
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
      </Routes>
    </div>
  );
};

export default App;
