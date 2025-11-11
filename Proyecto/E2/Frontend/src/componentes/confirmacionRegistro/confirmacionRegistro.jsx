import React from 'react';
import "./confirmacionRegistro.css";

const ConfirmacionRegistro = () => {
    return (
        <div className="success-registro">
            <div className="success-registro-content">
                <div className="success-registro-icon">✓</div>
                <div className="success-registro-text">
                    <h3>¡Registro exitoso!</h3>
                    <p>Redirigiendo al inicio de sesión...</p>
                </div>
            </div>
        </div>
    );
};

export default ConfirmacionRegistro;
