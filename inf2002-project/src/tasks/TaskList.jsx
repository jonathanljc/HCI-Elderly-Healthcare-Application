import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TaskList.css';
import Modal from './Modal'; // Import the modal component

const TaskList = ({ tasks, onAddTask }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleViewClick = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

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
              onClick={() => handleViewClick(task)}>  {/* Open modal with task info */}
              View
            </button>
          </li>
        )) : <li>No tasks available.</li>}
      </ul>
      <button className="add-task-button" onClick={onAddTask}>Add Task</button>

      {/* Modal component */}
      <Modal 
        isOpen={isModalOpen}
        onClose={closeModal}
        task={selectedTask}
      />
    </div>
  );
};

export default TaskList;
