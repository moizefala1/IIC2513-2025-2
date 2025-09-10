import React from "react";
import "./SuccessMessageModal.css";

const SuccessMessageModal = ({ isOpen, message, onClose }) => {

  return (
    <div className="fondo">
      <div className="success-modal">
        <p>{message}</p>
        <button className="success-button" onClick={onClose}>Aceptar</button>
      </div>
    </div>
  );
};

export default SuccessMessageModal;
