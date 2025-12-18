import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../componentes/navbar/navbar";
import "./register.css";
import logo from "../../assets/logo.png";
import ConfirmacionRegistro from "../../componentes/confirmacionRegistro/confirmacionRegistro";

// usamos el contexto para registrar y dejar logueado
import { useAuth } from "../../context/authContext";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const { register: doRegister } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Las contraseñas no coinciden");
      return;
    }

    setPasswordError("");
    setIsLoading(true);

    try {
      // Mapeo mínimo al backend: necesita username, email y password
      const usernameBase =
        formData.nombre?.trim() || formData.email.split("@")[0];
      const username = `${usernameBase}${formData.apellido ? "_" + formData.apellido.trim().replace(/\s+/g, "_") : ""}`
        .replace(/\s+/g, "_");

      await doRegister({
        username,
        email: formData.email,
        password: formData.password
      });

      setShowSuccess(true);
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setPasswordError(err?.message || "Error al registrar");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      setShowSuccess(false);
    };
  }, []);

  return (
    <>
      <div className="register-body">
        <div className="register-container">
          <div className="register-logo">
            <img src={logo} alt="Logo" />
          </div>
          <div className="register-form">
            <form onSubmit={handleSubmit}>
              <h2>Crear Cuenta</h2>

              <div className="name-row">
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  disabled={isLoading || showSuccess}
                  required
                />
                <input
                  type="text"
                  name="apellido"
                  placeholder="Apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  disabled={isLoading || showSuccess}
                  required
                />
              </div>

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading || showSuccess}
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading || showSuccess}
                required
                minLength="6"
              />

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirmar Contraseña"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={isLoading || showSuccess}
                required
                minLength="6"
              />

              {passwordError && (
                <div className="error-container">
                  <p className="password-error">{passwordError}</p>
                </div>
              )}

              <div className="accept-terms">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  disabled={isLoading || showSuccess}
                  required
                />
                <label>Acepto los términos y condiciones</label>
              </div>

              <button type="submit" disabled={isLoading || showSuccess}>
                {isLoading || showSuccess ? "Registrando..." : "Crear Cuenta"}
              </button>

              <div className="login-link">
                ¿Ya tienes cuenta?
                <span onClick={() => navigate("/login")}> Inicia sesión aquí</span>
              </div>
            </form>
          </div>
        </div>

        {showSuccess && <ConfirmacionRegistro />}
      </div>
    </>
  );
};

export default Register;
