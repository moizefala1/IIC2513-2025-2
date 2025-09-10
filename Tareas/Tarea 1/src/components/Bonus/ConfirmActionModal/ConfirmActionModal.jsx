import React from "react";
import "./ConfirmActionModal.css";

const ConfirmActionModal = ({ isOpen, onCancel, onConfirm, message }) => {

  return (
    <div className="fondo">
      <div className="confirm-modal">
        <p>{message}</p>
        <div className="confirm-buttons">
          <button className="confirm-button confirm" onClick={onConfirm}>Confirmar</button>
          <button className="confirm-button cancel" onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmActionModal;
