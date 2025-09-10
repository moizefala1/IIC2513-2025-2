import React, {useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyPokemonsPage.css";
import CreatePokemonModal from "../../components/CreatePokemonModal/CreatePokemonModal.jsx";
import PokemonCard from "../../components/PokemonCard/PokemonCard.jsx";
import PokemonCardModal from "../../components/PokemonCardModal/PokemonCardModal.jsx";
import EditPokemonModal from "../../components/EditPokemonModal/EditPokemonModal.jsx";
import ConfirmActionModal from "../../components/Bonus/ConfirmActionModal/ConfirmActionModal.jsx";
import SuccessMessageModal from "../../components/Bonus/SuccessMessageModal/SuccessMessageModal.jsx";
import ErrorMessageModal from "../../components/Bonus/ErrorMessageModal/ErrorMessageModal.jsx";




const MyPokemonPage = ({isLoggedIn, currentUserId, sesionRevisada}) => {
  const navigate = useNavigate();
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [myPokemons, setMyPokemons] = useState([]);
  const [user, setUser] = useState({});
  const [isModalCreacion, setIsModalCreacion] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoadingFetch, setIsLoadingFetch] = useState(true);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);



  const fetchMyPokemons = async () => {
    const response = await fetch(`https://t1-back-2025-2-s1.onrender.com/pokemons/user/${currentUserId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", 
      }
    });
    const data = await response.json();
    setMyPokemons(data);
    setIsLoadingFetch(false);
  };

  const fetchUser = async () => {
    const response = await fetch(`https://t1-back-2025-2-s1.onrender.com/users/${currentUserId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", 
      }
    });
    const data = await response.json();
    setUser(data.user);
  };


  // Crear Pokémon
  const handleCreatePokemon = async (pokemonForm) => {
    const response = await fetch("https://t1-back-2025-2-s1.onrender.com/pokemons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({
        name: pokemonForm.name,
        level: pokemonForm.level,
        types: pokemonForm.types,
        price: pokemonForm.price,
        image: pokemonForm.image,
        userId: currentUserId,
      }),
    });
    if (response.ok) {
      setIsModalCreacion(false);
      window.location.reload();
    };
  };

  // Abrir modal de detalles
  const handleOpenModal = (pokemon) => {
    setSelectedPokemon(pokemon);
    setIsModalOpen(true);
  };

  // Cerrar modal de detalles
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPokemon(null);
  };

  // Confirmar y borrar Pokémon
  const handleDelete = (pokemon) => {
     confirmDelete(pokemon);

  };

  // Borrar Pokémon
  const confirmDelete = async (pokemon) => {
      const response = await fetch(`https://t1-back-2025-2-s1.onrender.com/pokemons/${pokemon.id}/${pokemon.userId}`, { 
        method: "DELETE",
        headers: {
          "Content-Type": "application/json", 
        }
      });
      if (response.ok) {
        setIsModalOpen(false);
        window.location.reload();
      };
  };

  // Editar Pokémon
  const handleEditPokemon = (pokemon) => {
    
  };

  // Guardar cambios de edición
  const handleSaveEdit = async (updatedData) => {
  };

  // Poner a la venta
  const handlePutOnSale = async (pokemon) => {
      const response = await fetch(`https://t1-back-2025-2-s1.onrender.com/pokemons/${pokemon.id}/put-on-sale/${pokemon.userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        }
      });
      if (response.ok) {
        setIsModalOpen(false);
        window.location.reload();
      };
  };

  // Cancelar venta
  const handleCancelSale = async (pokemon) => {
    const response = await fetch(`https://t1-back-2025-2-s1.onrender.com/pokemons/${pokemon.id}/cancel-sale/${pokemon.userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      }
    });
    if (response.ok) {
      setIsModalOpen(false);
      window.location.reload();
    };
  };

 

  useEffect(() => {
    if (!isLoggedIn && sesionRevisada) {
      navigate("/login");
    }
  }, [isLoggedIn, sesionRevisada]); //si cierro sesion en la pagina ya renderizada, redirige a login, 
  // y si reinicio la pagina, isloggedin es momentaneamente falso, por lo que añado la condicion sesionrevisada para que
  // espere tambien a que se haya comprobado en app.jsx si el usuario esta logeado


  useEffect(() => {
    if (sesionRevisada) {
      fetchMyPokemons();
      fetchUser();
    }
  }, [sesionRevisada]);

  return (
    <>
    <div className="titulo-columna-derecha">
      <h1>Tus Pokémons:</h1>
    </div>
    <div className="container_pokemons">
      <div className="usuario">
        <img src="src/assets/entrenador_sprite.png"></img>
        <h2>{user.name}</h2>
        <h3>Saldo : {user.balance} $</h3>
        <button onClick={() => setIsModalCreacion(true)}>Crear Pokémon</button>
      </div>
      {(myPokemons.length > 0 || isLoadingFetch) ? (   
      <>
          <div className="pokemon-grid">
            {myPokemons.map(pokemon => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                onExamine={() => handleOpenModal(pokemon)}
              />
            ))}
        </div>
      </>   
      ) : (
        <h1>¡No tienes pokémons aún!</h1>
      )}

      {(isModalOpen && selectedPokemon) ? (
          <PokemonCardModal
            pokemon={selectedPokemon}
            onClose={handleCloseModal}
            isOwnerView={true}
            onEdit={() => {
              setIsEditModalOpen(true);
              setIsModalOpen(false);
            }}
            onPutOnSale={() => handlePutOnSale(selectedPokemon)}
            onDelete={() => handleDelete(selectedPokemon)}
            onCancelSale={() => handleCancelSale(selectedPokemon)}
          />
        ): null}

      {isModalCreacion ? (
        <CreatePokemonModal
          onClose={() => {
            setIsModalCreacion(false);
          }}
          onCreate={handleCreatePokemon}
        />
      ) : null}

      {isEditModalOpen ? (
        <EditPokemonModal
          onClose={() => {
            setIsEditModalOpen(false);
            setIsModalOpen(true);
          }}
          onEdit={() => handleEditPokemon(selectedPokemon)}
          pokemon={selectedPokemon}
        />
      ) : null}
    </div>
    </>
  );
};

export default MyPokemonPage;
