// EditTask.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './TaskList.css';

const EditTask = ({ tasks, onSave }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { task } = location.state || {}; // Access the task from the state

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Initialize fields if task is provided
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [task]);

  return (
    <div className="task-list">
      <header className="task-list-header">
        <button className="back-button" onClick={() => navigate('/')}>Back</button>
        <h2>Edit Tasks</h2>
      </header>
      <ul className="task-items">
        {tasks.length > 0 ? tasks.map((task, index) => (
          <li key={index} className="task-item">
            <div className="task-checkbox-title">
              <input type="checkbox" className="task-checkbox" readOnly />
              <div>
                <div className="task-title">{task.title}</div>
                <div className="task-description">{task.description}</div>
              </div>
            </div>
            <button 
              className="edit-button"
              onClick={() => navigate('/edit-task', { state: { task } })}
            >
              Edit
            </button>
          </li>
        )) : <li>No tasks available.</li>}
      </ul>
      <button className="add-task-button" onClick={() => navigate('/add-task')}>Add Task</button>
    </div>
  );
};

export default EditTask;
