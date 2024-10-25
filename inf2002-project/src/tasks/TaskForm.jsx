import React, { useState } from 'react';

const TaskForm = ({ onSave, onCancel, task = {} }) => {
  const [title, setTitle] = useState(task.title || '');
  const [description, setDescription] = useState(task.description || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, description });
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <header>
        <button type="button" onClick={onCancel}>Back</button>
        <h2>{task.id ? 'Edit Task' : 'Add Task'}</h2>
        <button type="submit">Add</button>
      </header>
      <div>
        <label>Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
    </form>
  );
};

export default TaskForm;
