import React from "react";
import "./PokemonCard.css";

const PokemonCard = ({
  pokemon,
  onExamine, 
  isOnMainPage = false,
}) => {
  return (
    <div className="pokemon-card">
      {(!isOnMainPage)? (
      <>  
      <div className="img-container">
        <img src={pokemon.image} className="foto" />
      </div>
      <h2><strong>{pokemon.name}</strong></h2>
      <h3>Nivel:{pokemon.level}</h3>
      <h3>Tipo(s): {pokemon.types}</h3>
      <h3>Precio: {pokemon.price} </h3>
      <button className="examinar" onClick={() => onExamine(pokemon)}>Examinar</button>
      </>)
      
      :(
        <>  
          <div className="img-container">
            <img src={pokemon.image} className="foto" />
          </div>
          <h2><strong>{pokemon.name}</strong></h2>
          <h3>Nivel:{pokemon.level}</h3>
          <h3>Tipo(s): {pokemon.types}</h3>
          <h3>Precio: {pokemon.price} </h3>
          <p>Mas detalles en "Mis Pokémons"</p>
        </>
      )}


    </div>
  );
};
export default PokemonCard;
