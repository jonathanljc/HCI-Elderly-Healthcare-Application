// TaskList.jsx
import React, { useState } from 'react';
import './TaskList.css';
import Modal from './Modal'; // Import the Modal component

const TaskList = ({ tasks, onAddTask, onEditTask }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const openModal = (task) => {
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
        <button className="back-button" onClick={() => onAddTask('back')}>Back</button>
        <h2>Tasks</h2>
        <button className="edit-button" onClick={onEditTask}>Edit</button>
      </header>
      <ul className="task-items">
        {tasks.map((task, index) => (
          <li key={index} className="task-item">
            <div className="task-checkbox-title">
              <input type="checkbox" className="task-checkbox" />
              <div>
                <div className="task-title">{task.title}</div>
                <div className="task-description">{task.description}</div>
              </div>
            </div>
            <button className="view-button" onClick={() => openModal(task)}>View</button>
          </li>
        ))}
      </ul>
      <button className="add-task-button" onClick={onAddTask}>Add Task</button>

      {/* Modal for viewing task details */}
      <Modal isOpen={isModalOpen} onClose={closeModal} task={selectedTask} />
    </div>
  );
};

export default TaskList;
