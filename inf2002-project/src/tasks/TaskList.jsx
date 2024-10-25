// TaskList.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TaskList.css';

const TaskList = ({ tasks, onAddTask, onEditTask }) => {
  const navigate = useNavigate();

  return (
    <div className="task-list">
      <header className="task-list-header">
        <button className="back-button" onClick={() => navigate('/')}>Back</button>
        <h2>Tasks</h2>
        <button 
          className="edit-button" 
          onClick={() => navigate('/edit-task')} // Redirect to Edit page
        >
          Edit
        </button>
      </header>
      <ul className="task-items">
        {tasks.length > 0 ? tasks.map((task, index) => (
          <li key={index} className="task-item">
            <div className="task-checkbox-title">
              <input type="checkbox" className="task-checkbox" />
              <div>
                <div className="task-title">{task.title}</div>
                <div className="task-description">{task.description}</div>
              </div>
            </div>
            <button 
              className="view-button" 
              onClick={() => navigate('/task-detail', { state: { task } })}>
              View
            </button>
          </li>
        )) : <li>No tasks available.</li>}
      </ul>
      <button className="add-task-button" onClick={onAddTask}>Add Task</button>
    </div>
  );
};

export default TaskList;
