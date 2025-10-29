import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../componentes/navbar/navbar";
import "./login.css";
import logo from "../../assets/logo.png";
import ConfirmacionLogin from "../../componentes/confirmacionLogin/confirmacionLogin";

const Login = ({isLoggedIn, setIsLoggedIn, setUser}) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(""); // Limpiar errores previos
        setIsLoading(true);
        
        //simula llamada al backend
        if (email !== "admin@dawdle.com" || password !== "123456") {
            setIsLoading(false);
            setError("Email o contraseña incorrectos");
            return;
        }
        
        setTimeout(() => {
            setIsLoading(false);
            setShowSuccess(true);
            
            if (rememberMe) {
                localStorage.setItem("rememberedEmail", email);
            } else {
                localStorage.removeItem("rememberedEmail");
            }
            
            setTimeout(() => {
                setIsLoggedIn(true);
                setUser("admin"); // deberia ser el user una vez exista back end
                navigate("/"); 
            }, 1500);
        }, 1500);
    };

    useEffect(() => {
        setShowSuccess(false);
        const savedEmail = localStorage.getItem("rememberedEmail");
        if (savedEmail) {
            setEmail(savedEmail);
            setRememberMe(true);
        }

        if (isLoggedIn) {
            navigate("/");
        }
    }, [isLoggedIn, navigate]);

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
                               <p className="password-error">{error} </p>   
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
                            <span onClick={() => navigate("/register")}>
                                Registrarse aquí
                            </span>
                        </div>
                    </form>
 
                </div>
            </div>
            
            {showSuccess && (
                <ConfirmacionLogin />
            )}
        </div>

    );
};

export default Login;