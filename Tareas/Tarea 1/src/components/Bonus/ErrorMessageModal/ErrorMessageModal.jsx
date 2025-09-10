import React from "react";
import "./ErrorMessageModal.css";

const ErrorMessageModal = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fondo">
      <div className="error-modal">
        <p>{message}</p>
        <button className="error-button" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default ErrorMessageModal;
