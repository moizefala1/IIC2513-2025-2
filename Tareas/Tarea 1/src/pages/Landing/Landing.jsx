import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";


const Landing = ({currentUser, isLoggedIn}) => {
  return (
    <>
    <img src="src/assets/rayquaza.png" className="rayquaza"></img>
    <div className="container_landing">
      <div className="principal">
        <img src="src/assets/pokeball_logo.png "className="logo"></img>
        {isLoggedIn ? 
        (<h1 className="titulo">¡Bienvenido a MarketBall, {currentUser}!</h1> 
        ) : (
        <h1 className="titulo">¡Bienvenido a MarketBall!</h1>
        )}
        <p className="bajada">
          Explora el marketplace de pokémons: inicia sesión, crea tus pokémons,
          publícalos, edítalos o elimínalos, y compra a otros entrenadores.
        </p>
      </div>

      <h2>¿Qué puedes hacer aquí?</h2>
      <div className="container_features">
        <div className="card">
          <h3>Explorar</h3>
          <p>Ve el catálogo de pokémons en venta para unavista detallada.</p>
        </div>
        <div className="card">
          <h3>Comprar</h3>
          <p>Si no eres el dueño, podrás comprarlos desde Explorar Pokemons.</p>
        </div>
        <div className="card">
          <h3>Vender</h3>
          <p>Publica o cancela publicaciones de tus pokemons en “Mis pokémons”.</p>
        </div>
        <div className="card">
          <h3>Crear & Editar</h3>
          <p>Crea pokémons con validaciones (nivel, precio, imagen) y edítalos cuando quieras.</p>
        </div>
      </div>

      <h2>¿Cómo funciona?</h2>
      <ul className="steps">
        <li>Ve a <strong>Iniciar sesión</strong>. Si el usuario no existe, el sistema lo crea automáticamente.</li>
        <li>Investiga en <strong>Explorar Pokemons</strong> y abre la carta del Pokémon que mas te interese para ver sus detalles.</li>
        <li>Una vez decidido, puedes comprar el Pokémon desde su carta.</li>
        <li>En <strong>Mis pokémons</strong> puedes crear, editar, publicar o eliminar tus pokémons.</li>
      </ul>
    </div>
    </>
  );
};

export default Landing;
