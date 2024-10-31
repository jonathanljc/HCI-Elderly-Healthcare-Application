import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ViewTask.css'; // Use the updated CSS file
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import FontAwesome CSS

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
    navigate('/tasks'); // Navigate back to task list after saving
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(task.id);
    }
    navigate('/tasks'); // Navigate back to task list after deletion
  };

  return (
    <div className="view-task">
      <header className="view-task-header">
        <button className="back-button" onClick={() => navigate('/')}>
          <i className="fas fa-arrow-left"></i> Back
        </button>
        <h2>View Task</h2>
      </header>
      <form>
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Task Title"
          />
        </label>
        <label>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Task Description"
          />
        </label>
      </form>
      <button className="save-button" onClick={handleSave}>
        <i className="fas fa-save"></i> Save Changes
      </button>
      <button className="delete-button" onClick={handleDelete}>
        <i className="fas fa-trash-alt"></i> Delete
      </button>
    </div>
  );
};

export default ViewTask;
