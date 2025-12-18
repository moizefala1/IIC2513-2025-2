import React from "react";
import "./modalConfirmacion.css";

const ModalConfirmacion = ({ mensaje, onConfirmar, onCancelar, tipo = "warning" }) => {
  const getIcon = () => {
    switch (tipo) {
      case "delete":
        return "🗑️";
      case "success":
        return "✅";
      case "warning":
        return "⚠️";
      default:
        return "❓";
    }
  };

  return (
    <div className="modal-confirmacion-overlay" onClick={onCancelar}>
      <div className="modal-confirmacion-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-confirmacion-icon">{getIcon()}</div>
        <p className="modal-confirmacion-mensaje">{mensaje}</p>
        <div className="modal-confirmacion-buttons">
          <button
            className="modal-confirmacion-btn cancelar"
            onClick={onCancelar}
          >
            Cancelar
          </button>
          <button
            className={`modal-confirmacion-btn confirmar ${tipo}`}
            onClick={onConfirmar}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmacion;
