import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from '../../lib/auth';

const PokemonCardModal = ({
  isOpen,
  onClose,
  pokemon,
  userId,
  isOwnerView = false,
  onEdit,
  onPutOnSale,
  onCancelSale,
  onDelete,
  onBuy,
}) => {
  const navigate = useNavigate();

  // 🔹 MOVER AQUÍ: estados del dueño
  const [ownerName, setOwnerName] = React.useState("");
  const [ownerLoading, setOwnerLoading] = React.useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [isOpen]);

  // 🔹 MOVER AQUÍ: efecto que trae el dueño
  useEffect(() => {
    if (!isOpen || !pokemon?.userId) return;

    // si el usuario actual es el dueño, no llamamos a la API
    if (userId && pokemon.userId === userId) {
      setOwnerName("Tú");
      setOwnerLoading(false);
      return;
    }

    const controller = new AbortController();
    setOwnerLoading(true);
    setOwnerName("");
    fetch(`${API_BASE}/users/${pokemon.userId}`, {
      signal: controller.signal,
    })
      .then((r) => {
        if (!r.ok) throw new Error("No se pudo obtener el dueño");
        return r.json();
      })
      .then((data) => {
        setOwnerName(data?.user?.name || `Entrenador #${pokemon.userId}`);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setOwnerName(`Entrenador #${pokemon.userId}`);
        }
      })
      .finally(() => setOwnerLoading(false));

    return () => controller.abort();
  }, [isOpen, pokemon?.userId, userId]);

  if (!isOpen || !pokemon) return null;

  const isOwner =
    isOwnerView || (userId && pokemon.userId && userId === pokemon.userId);

  const goToOwnerPage = () => {
    // usa la forma con slash; si además tienes el alias con guion, también funcionará
    navigate(`/my-pokemons/${pokemon.userId}`);
    // opcional: cerrar el modal al navegar
    onClose?.();
  };


  const handleBuy = () => {
    if (!userId) {
      navigate("/login");
    } else if (onBuy) {
      onBuy(pokemon);
    }
  };

  const handleDelete = () => {
    onDelete && onDelete(pokemon);
  };

  return (
    <div className="modal-overlay">
      <div className="modal pokemon-modal">
        <div className="modal-image">
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className="pokemon-img-lg"
          />
        </div>
        <div className="modal-body">
          <h2 className="pokemon-name">{pokemon.name}</h2>
          <p className="pokemon-level"><strong>Nivel:</strong>  {pokemon.level}</p>
          <p className="pokemon-types">
            <strong>Tipos:</strong>  {pokemon.types?.join(", ")}
          </p>
          <p className="pokemon-owner">
            <strong>Dueño:</strong>{" "}
            {isOwner
              ? "Tú"
              : ownerLoading
              ? "Cargando..."
              : (
                  // nombre clickeable -> navega a /my-pokemons/:userId
                  <button
                    type="button"
                    onClick={goToOwnerPage}
                    style={{
                      background: "none",
                      border: "none",
                      padding: 0,
                      margin: 0,
                      cursor: "pointer",
                      color: "var(--primary-blue)",
                      textDecoration: "underline",
                      font: "inherit"
                    }}
                    aria-label={`Ver pokémon publicados de ${ownerName}`}
                    title={`Ver pokémon publicados de ${ownerName}`}
                  >
                    {ownerName}
                  </button>
                )
            }
          </p>
          <p className="pokemon-price">💰 {pokemon.price} Pokecoins</p>

        </div>
        <div className="modal-footer">
          {isOwner ? (
            <>
              <button className="btn btn-primary" onClick={() => onEdit(pokemon)}>
                Editar
              </button>
              {pokemon.onSale ? (
                <button className="btn btn-warning" onClick={() => onCancelSale(pokemon)}>
                  Cancelar publicación
                </button>
              ) : (
                <button className="btn btn-success" onClick={() => onPutOnSale(pokemon)}>
                  Publicar
                </button>
              )}
              <button className="btn btn-danger" onClick={handleDelete}>
                Eliminar
              </button>
              <button className="btn btn-secondary" onClick={onClose}>
                Cancelar 
              </button>
            </>
          ) : (
            <>
              <button className="btn btn-primary" onClick={handleBuy}>
                Comprar
              </button>
              <button className="btn btn-secondary" onClick={onClose}>
                Cancelar
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PokemonCardModal;
