import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './EditTask.css'; // Use the unique EditTask.css
import '@fortawesome/fontawesome-free/css/all.min.css';

const EditTask = ({ tasks, onSave }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { task } = location.state || {};

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [task]);

  return (
    <div className="edit-task-container">
      <header className="edit-task-header">
        <button 
          className="edit-task-back-button" 
          onClick={() => navigate('/')}
        >
          <i className="fas fa-arrow-left"></i> Back
        </button>
        <div className="edit-task-title">Edit Tasks</div>
      </header>

      {/* Render the list of tasks */}
      <ul className="edit-task-items">
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <li key={index} className="edit-task-item">
              <div className="edit-task-content">
                <div>
                  <div className="edit-task-item-title">{task.title}</div>
                </div>
              </div>
              <button
                className="edit-task-edit-button"
                onClick={() => navigate('/view-task', { state: { task } })}
              >
                <i className="fas fa-edit"></i> Edit
              </button>
            </li>
          ))
        ) : (
          <li className="empty-task-message">No tasks available.</li>
        )}
      </ul>

      {/* Add Task Button */}
      <button 
        className="edit-task-add-button" 
        onClick={() => navigate('/add-task')}
      >
        <i className="fas fa-plus"></i> Add Task
      </button>
    </div>
  );
};

export default EditTask;
