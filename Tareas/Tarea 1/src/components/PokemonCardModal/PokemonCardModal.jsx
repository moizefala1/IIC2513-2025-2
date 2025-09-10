import {React, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./PokemonCardModal.css";

const PokemonCardModal = ({
  onClose,
  pokemon,
  isOwnerView = false,
  onEdit,
  onPutOnSale,  
  onDelete,
  onBuy,
  onCancelSale,
}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  
  const fetchUser = async () => {
    const response = await fetch(`https://t1-back-2025-2-s1.onrender.com/users/${pokemon.userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", 
      }
    });
    const data = await response.json();
    setUser(data.user.name);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return !isOwnerView ? (
    <>
      <div className="fondo"></div>
      <div className="carta">
        <div className="atributos">  
          <img src={pokemon.image} alt={pokemon.name}/>    
          <h2>{pokemon.name}</h2>
          <p>Tipo: {pokemon.types}</p>
          <p>Nivel: {pokemon.level}</p>
          {isLoading ? <p>Dueño: ...</p> : <p>Dueño: {user}</p>}
          <p>Precio: ${pokemon.price}</p>
        </div>
        <div className="botones">
          <button onClick={onBuy} className="botones verde">Comprar</button>
          <button onClick={onClose} className="botones gris">Salir</button>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="fondo"></div>
      <div className="carta-mypokemons">
        <div className="x">
          <button onClick={onClose} className="boton_salir-mypokemons">X</button>
        </div>
        <div className="atributos-mypokemons">  
          <img src={pokemon.image} alt={pokemon.name}/>    
          <h2>{pokemon.name}</h2>
          <p>Tipo: {pokemon.types}</p>
          <p>Nivel: {pokemon.level}</p>
          <p>Dueño: Tú</p> 
          <p>Precio: ${pokemon.price}</p>
        </div>
        <div className="botones-mypokemons">
          <button onClick={onPutOnSale} className="botones-mypokemons verde">Publicar</button>
          <button onClick={onDelete} className="botones-mypokemons rojo">Eliminar</button>
          <button onClick={onEdit} className="botones-mypokemons gris">Editar</button>
          <button onClick={onCancelSale} className="botones-mypokemons gris">Cancelar Venta</button>
        </div>
      </div>
    </>
  );
};

export default PokemonCardModal;