import React from "react";
import "./confirmacionCrearEvento.css";
export const ConfirmacionCrearEvento = ({ setShowSuccess }) => {
  return (
    <div className="confirmacion-crear-evento-body">
        <div className="success-message">
            <p>Tarea creada con éxito ✅</p>
            <button onClick={() => setShowSuccess(false)}>Volver</button>
        </div>
    </div>
  );
};
export default ConfirmacionCrearEvento;