import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Navbar.css";

const Navbar = ({isLoggedIn, onLogout}) => {
  const navigate = useNavigate();
  return (
    <nav className="navbar">

      <button onClick={() => navigate("/pokemons")} className='boton_navbar'>Explorar Pokémons</button>

      <img 
        src='src/assets/pokeball_logo.png' 
        onClick={() => {navigate('/')}}
        className='logo_navbar' 
        alt="Logo"
      />

      {isLoggedIn ? (
        <>
          <button onClick={() => {navigate('/my-pokemons')}} 
          className='boton_navbar boton_navbar_mis_pokemons'>Mis Pokémons</button>
          <button onClick={onLogout} className='boton_navbar'>Cerrar Sesión</button>
        </>
      ) : (
        <button onClick={() => navigate('/login')} className='boton_navbar'>Iniciar Sesión</button>
      )}

    </nav>
  );
};

export default Navbar;
