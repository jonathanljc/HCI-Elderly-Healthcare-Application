import React, { useState } from 'react';
import TaskList from './tasks/TaskList';
import TaskForm from './tasks/TaskForm';
import TaskDetail from './tasks/TaskDetail';
import './tasks/TaskList.css';
 
import './App.css'; // Keep the existing styling if needed

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [view, setView] = useState('list'); // 'list', 'add', 'view', 'edit'

  const addTask = () => setView('add');
  const editTask = (task) => {
    setCurrentTask(task);
    setView('edit');
  };
  const viewTask = (task) => {
    setCurrentTask(task);
    setView('view');
  };
  const saveTask = (task) => {
    if (currentTask) {
      setTasks(tasks.map(t => t.id === currentTask.id ? task : t));
    } else {
      task.id = new Date().getTime();
      setTasks([...tasks, task]);
    }
    setView('list');
  };
  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    setView('list');
  };

  return (
    <div className="app-container">
      {view === 'list' && (
        <TaskList
        tasks={tasks}
        onAddTask={addTask}
        onEditTask={editTask} // Directly pass the editTask function
        onViewTask={viewTask}
      />
      )}
      {view === 'add' && (
        <TaskForm onSave={saveTask} onCancel={() => setView('list')} />
      )}
      {view === 'view' && currentTask && (
        <TaskDetail
          task={currentTask}
          onDelete={deleteTask}
          onEdit={() => editTask(currentTask)}
          onBack={() => setView('list')}
        />
      )}
      {view === 'edit' && currentTask && (
        <TaskForm
          task={currentTask}
          onSave={saveTask}
          onCancel={() => setView('list')}
        />
      )}
    </div>
  );
};

export default App;
