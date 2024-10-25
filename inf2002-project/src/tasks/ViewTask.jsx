// ViewTask.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './TaskList.css';

const ViewTask = ({ onSave, onDelete }) => {
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

  const handleSave = () => {
    if (!title || !description) {
      alert('Please fill in both fields.');
      return;
    }

    // Overwrite the existing task data
    onSave({ ...task, title, description }); // Use the existing task's `id` to update
    navigate('/'); // Navigate back to task list after saving
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(task.id);
    }
    navigate('/'); // Navigate back to task list after deletion
  };

  return (
    <div className="task-list">
      <header className="task-list-header">
        <button className="back-button" onClick={() => navigate('/')}>Back</button>
        <h2>View Task</h2>
      </header>
      <form>
        <label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Task Title"
          />
        </label>
        <label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Task Description"
          />
        </label>
      </form>
      <button className="save-button" onClick={handleSave}>Save Changes</button>
      <button className="delete-button" onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default ViewTask;
