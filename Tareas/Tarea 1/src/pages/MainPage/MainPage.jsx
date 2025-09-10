import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PokemonCard from "../../components/PokemonCard/PokemonCard.jsx"; 
import PokemonCardModal from "../../components/PokemonCardModal/PokemonCardModal.jsx";
import ConfirmActionModal from "../../components/Bonus/ConfirmActionModal/ConfirmActionModal.jsx";
import SuccessMessageModal from "../../components/Bonus/SuccessMessageModal/SuccessMessageModal.jsx";
import ErrorMessageModal from "../../components/Bonus/ErrorMessageModal/ErrorMessageModal.jsx";
import "./MainPage.css";

const MainPage = ({isLoggedIn, currentUserId, sesionRevisada}) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [pokemons, setPokemons] =  useState([]);
  const [myPokemons, setMyPokemons] =  useState([]);
  const [pokemonsVisibles, setPokemonsVisibles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8); 
  const [arrayPagina, setArrayPagina] = useState([]);
  const total = pokemons.length;
  const totalPages = Math.ceil(total / pageSize); // techo para que no queden pokemon sin mostrar 
  // (por ejemplo si no son divisibles por el tamaño de página) de pagina

  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const fetchPokemons = async () => {
    const response = await fetch("https://t1-back-2025-2-s1.onrender.com/pokemons", {
      method: "GET",
      headers: {
        "Content-Type": "application/json", 
      }
    });
    
    if (isLoggedIn) {
      const data = await response.json();
      const myPokemons = data.filter(pokemon => (pokemon.userId === currentUserId) && (pokemon.onSale === true));
      setMyPokemons(myPokemons);
      const pokemons = data.filter(pokemon => (pokemon.onSale === true) && (pokemon.userId !== currentUserId));
      setPokemons(pokemons);
    }
    else {
      const data = await response.json();
      const pokemons = data.filter(pokemon => pokemon.onSale === true);
      setPokemons(pokemons);
    }
  };


  const handleOpenModal = (pokemon) => {
    setSelectedPokemon(pokemon);
    setIsModalOpen(true);
  };


  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPokemon(null);
  };


  const handleBuy = (pokemon) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    setIsModalOpen(false);
    setIsConfirmModalOpen(true);
  };

  const confirmBuy = async (pokemon) => {
    const response = await fetch(`https://t1-back-2025-2-s1.onrender.com/pokemons/${pokemon.id}/buy/${currentUserId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      }
    });
    if (response.ok) {
      setIsConfirmModalOpen(false);
      setIsSuccessModalOpen(true);
    }
    else {
      setIsConfirmModalOpen(false);
      setIsErrorModalOpen(true);
    }
  };

  useEffect(() => {
    if (sesionRevisada) {
      fetchPokemons();
    }
  }, [sesionRevisada]);// para que solo se ejecute una vez, despues del renderizado del html 

  useEffect(() => {
    const crearArrayPagina = (n) => {
      const array_pagina = [];
      for (let i = 1; i <= n; i++) {
        array_pagina.push(i);
      }
      return array_pagina;
    };
    
    setArrayPagina(crearArrayPagina(totalPages));
  }, [totalPages]);
  //cada vez que cambe el numero de paginas se genera un array desde 1 hasta el numero de paginas

  useEffect(() => {
    const index = (currentPage - 1) * pageSize;
    const nuevosPokemonsVisibles = pokemons.slice(index, index + pageSize); //muestr alos pokemons desde el indice actual
    setPokemonsVisibles(nuevosPokemonsVisibles); 
  }, [currentPage, pageSize, pokemons]);

  useEffect(() => {
    setCurrentPage(1);
  }, [pageSize]); // vuelve a la página 1 cuando cambian el tamaño de página 


  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isModalOpen]);// desactivamos el scroll vertical cuando la carta se examina


return (
  <>
    { isLoggedIn ? (
      <>
      <h1>Mis Pokemons en venta:</h1>
      <div className="pokemon-grid">
        {myPokemons.map(pokemon => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onExamine={() => handleOpenModal(pokemon)}
            isOnMainPage={true}
          />
        ))}
      </div>
      </>
      ): null  }
    <h1>Pokémons disponibles:</h1>

    {pokemonsVisibles.length === 0 ? (
      <p>No hay pokémons disponibles</p>
    ) : (
      <div className="pokemon-grid">
        {pokemonsVisibles.map(pokemon => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onExamine={() => handleOpenModal(pokemon)}
          />
        ))}
      </div>
    )}

    {(isModalOpen && selectedPokemon) ? (
      <PokemonCardModal
        pokemon={selectedPokemon}
        onClose={handleCloseModal}
        onBuy={() => handleBuy(selectedPokemon)}
      />
    ): null}
    {(isConfirmModalOpen && selectedPokemon) ? (
      <ConfirmActionModal
        isOpen={isConfirmModalOpen}
        onCancel={() => {
          setIsConfirmModalOpen(false)
          setIsModalOpen(true);
        }

        }
        onConfirm={() => confirmBuy(selectedPokemon)}
        message={`¿Estás seguro de comprar a ${selectedPokemon.name}?`}
      />
    ) : null}

    {(isSuccessModalOpen && selectedPokemon) ? (
      <SuccessMessageModal
        isOpen={isSuccessModalOpen}
        onClose={() => {
          setIsSuccessModalOpen(false);
          window.location.reload();
        }
        }
        message={`¡Compraste a ${selectedPokemon.name}!`}
      />
    ): null}
    {(isErrorModalOpen && selectedPokemon) ? (
      <ErrorMessageModal
        isOpen={isErrorModalOpen}
        onClose={() => {
          setIsErrorModalOpen(false);
        }
        }
        message={`No se pudo comprar a ${selectedPokemon.name}`}
      />
    ): null}
    <div className="pagination">
      <button
        onClick={() => setCurrentPage(1)}
        disabled={currentPage === 1}
      >
        «
      </button>
      <button
        onClick={() => setCurrentPage(p =>  p - 1)}
        disabled={currentPage === 1}
      >
        Anterior
      </button>

      {arrayPagina.map(pagina => (
        <button
          key={pagina}
          onClick={() => setCurrentPage(pagina)}
          disabled={currentPage === pagina}
          className={pagina === currentPage ? "active" : ""}
        >
          {pagina}
        </button>
      ))}


      <button
        onClick={() => setCurrentPage(p =>  p + 1)}
        disabled={currentPage === totalPages}
      >
        Siguiente
      </button>
      <button
        onClick={() => setCurrentPage(totalPages)}
        disabled={currentPage === totalPages}
      >
        »
      </button>

      <div className="por_pagina">
        por página:
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}// numero para que podamos iterar en el for sin que se muera fjdsfjksd
        >
          <option value={4}>4</option>
          <option value={8}>8</option>
          <option value={12}>12</option>
        </select>
      </div>
    </div>
  </>
  );
};
export default MainPage;