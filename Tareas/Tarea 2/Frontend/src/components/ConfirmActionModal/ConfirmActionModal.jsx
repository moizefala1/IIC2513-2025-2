import React, { useEffect } from "react";

const ConfirmActionModal = ({ isOpen, onCancel, onConfirm, message }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay confirm-action-modal-overlay">
      <div className="modal confirm-action-modal">
        <h2 className="modal-title">⚠️ ¿Estás seguro?</h2>
        <p className="modal-message">
          {message ||
            "¿Seguro que quieres realizar esta acción? 🤔 Es irreversible... como cuando borras tu partida sin querer 😱"}
        </p>

        <div className="modal-footer">
          <button className="btn btn-danger" onClick={onConfirm}>
            Confirmar
          </button>
          <button className="btn btn-secondary" onClick={onCancel} style={{ marginLeft: 8 }}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmActionModal;
