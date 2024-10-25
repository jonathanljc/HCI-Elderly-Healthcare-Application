import React from 'react';
import './Modal.css'; // Ensure this file contains your updated styles

const Modal = ({ isOpen, onClose, task }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>X</button>
        <h2>{task.title}</h2>
        <p>{task.description}</p>
      </div>
    </div>
  );
};

export default Modal;
