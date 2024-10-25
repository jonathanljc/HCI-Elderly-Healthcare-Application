import React from 'react';

const TaskDetail = ({ task, onDelete, onEdit, onBack }) => {
  return (
    <div className="task-detail">
      <button onClick={onBack}>Back</button>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <button onClick={onEdit}>Save Changes</button>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
};

export default TaskDetail;
