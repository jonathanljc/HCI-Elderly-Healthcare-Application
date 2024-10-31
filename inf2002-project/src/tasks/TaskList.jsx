  import React, { useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import './TaskList.css'; // Use TaskList-specific styles
  import '@fortawesome/fontawesome-free/css/all.min.css';
  import Modal from './Modal'; // Import the modal component
  import Navbar from '../navbar/Navbar';

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
      <div className="task-list-container">
        <Navbar/>
        <header className="task-list-header">
          <h2 className="task-list-title">Tasks</h2>
          <button
            className="task-list-edit-button"
            onClick={() => navigate('/edit-task')} // Redirect to Edit page
          >
            <i className="fas fa-edit"></i> Edit
          </button>
        </header>

        {/* Render the list of tasks before the Add Task button */}
        <ul className="task-list-items">
          {tasks.length > 0 &&
            tasks.map((task, index) => (
              <li key={index} className="task-list-item">
                <div className="task-list-item-content">
                  <div>
                    <div className="task-list-item-title">{task.title}</div>
                  </div>
                </div>
                <button
                  className="task-list-view-button"
                  onClick={() => handleViewClick(task)} // Open modal with task info
                >
                  <i className="fas fa-eye"></i> View
                </button>
              </li>
            ))}
        </ul>

        {/* Conditional Rendering for No Tasks Available */}
        {tasks.length === 0 && (
          <div className="task-list-empty-message">No tasks available.</div>
        )}

        {/* Add Task Button */}
        <button className="task-list-add-button" onClick={onAddTask}>
          <i className="fas fa-plus"></i> Add Task
        </button>

        {/* Modal component */}
        <Modal isOpen={isModalOpen} onClose={closeModal} task={selectedTask} />
      </div>
    );
  };

  export default TaskList;
