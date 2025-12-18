import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import logo from "../../assets/Logo_navbar.png";
const Navbar = ({isLoggedIn, onLogout}) => {
  return (
    <nav className="navbar">

      <div className="navbar__inner">
        <Link to="/" className="navbar__logo">
          <img src={logo} />
        </Link>
        {!isLoggedIn ? (
          <ul className="navbar__menu">
            <li className="navbar__menu-item">
              <Link to="/login">Iniciar Sesión</Link>
            </li>
            <li className="navbar__menu-item">
              <Link to="/register">Registrarse</Link>
            </li>
            <li className="navbar__menu-item">
              <Link to="/about-us">Quiénes somos</Link>
            </li>
            <li className="navbar__menu-item">
              <Link to="/docs">¿Cómo funciona?</Link>
            </li>
          </ul>
        ) : (
          <ul className="navbar__menu">
            <li className="navbar__menu-item">
              <Link to="/mainPage">Mis Tareas</Link>
            </li>
            <li className="navbar__menu-item">
              <Link to="/profile">Mi Perfil</Link>
            </li>
            <li className="navbar__menu-item">
              <Link to="/about-us">Quiénes somos</Link>
            </li>
            <li className="navbar__menu-item">
              <Link to="/docs">¿Cómo funciona?</Link>
            </li>
          
            <li className="navbar_logout">
              <button onClick={onLogout}>
                <span>Cerrar Sesión</span>
              </button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;