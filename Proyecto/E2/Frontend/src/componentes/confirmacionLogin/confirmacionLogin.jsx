import React from 'react';
import "./confirmacionLogin.css";

const ConfirmacionLogin = () => {
    return (
        <div className="success">
            <div className="success-content">
                <div className="success-icon">✓</div>
                <div className="success-text">
                    <h3>¡Inicio de sesión exitoso!</h3>
                    <p>Redirigiendo...</p>
                </div>
            </div>
        </div>
    );
};

export default ConfirmacionLogin;