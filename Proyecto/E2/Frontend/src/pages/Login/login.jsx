import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../componentes/navbar/navbar";
import "./login.css";
import logo from "../../assets/logo.png";
import ConfirmacionLogin from "../../componentes/confirmacionLogin/confirmacionLogin";

import { useAuth } from "../../context/authContext";

const Login = ({ isLoggedIn, setIsLoggedIn, setUser }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { user: ctxUser, login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
      
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }
      setIsLoading(false);
      setShowSuccess(true);

      setTimeout(() => {
        if (typeof setIsLoggedIn === "function") setIsLoggedIn(true);
        if (typeof setUser === "function") setUser((ctxUser && ctxUser.username) || ""); 
        navigate("/");
      }, 3000);
    } catch (err) {
      setError(err?.message || "Email o contraseña incorrectos");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }

    if (isLoggedIn || ctxUser) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="login-body">
      <div className="login-container">
        <div className="login-logo">
          <img src={logo} />
        </div>
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <h2>Iniciar Sesión</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading || showSuccess}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading || showSuccess}
              required
            />

            {error && (
              <div className="error-container">
                <p className="password-error">{error}</p>
              </div>
            )}

            <div className="remember-me">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={isLoading || showSuccess}
              />
              <label>Recordarme</label>
            </div>

            <button type="submit" disabled={isLoading || showSuccess}>
              {isLoading || showSuccess ? "Iniciando sesión..." : "Iniciar Sesión"}
            </button>
            <div className="register-link">
              ¿No tienes cuenta?
              <span onClick={() => navigate("/register")}> Registrarse aquí</span>
            </div>
          </form>
        </div>
      </div>

      {showSuccess && <ConfirmacionLogin />}
    </div>
  );
};

export default Login;
