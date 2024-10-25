// AddTask.jsx
import React, { useState } from 'react';
import './AddTask.css'; // Import the CSS for styling

const AddTask = ({ onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(''); // State to manage error messages

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate inputs
    if (!title.trim() || !description.trim()) {
      setError('Please fill in both the title and description.'); // Set error message
      return; // Prevent form submission
    }

    // Pass the new task to the parent component
    onSave({ title, description });
    // Reset fields after submission
    setTitle('');
    setDescription('');
    setError(''); // Clear error message
  };

  return (
    <div className="add-task-container">
      <header className="add-task-header">
        <button className="back-button" onClick={() => window.history.back()}>Back</button>
        <h2>Add Task</h2>
        <button className="add-button" onClick={handleSubmit}>Add</button>
      </header>
      <form onSubmit={handleSubmit}>
        <label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
            placeholder="Title" // Add placeholder for Title
          />
        </label>
        <label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
            placeholder="Description" // Add placeholder for Description
          />
        </label>
        {/* Display error message if there's one */}
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
};

export default AddTask;
