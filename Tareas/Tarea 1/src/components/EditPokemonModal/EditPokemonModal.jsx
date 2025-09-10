import React, { useState, useEffect } from "react";
import "./EditPokemonModal.css";

const EditPokemonModal = ({ isOpen, onClose, onEdit, pokemon }) => {
  const [formData, setFormData] = useState({
    name: "",
    level: "",
    types: "",
    price: "",
    image: "",
  });

  // Como siempre hay pokemon, precargamos sin checks de null/undefined
  useEffect(() => {
    setFormData({
      name: pokemon.name,
      level: String(pokemon.level),
      types: Array.isArray(pokemon.types) ? pokemon.types.join(", ") : pokemon.types,
      price: String(pokemon.price),
      image: pokemon.image,
    });
  }, [pokemon]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit({
      ...pokemon,
      ...formData,
    });
  };

  return (
    <div className="fondo">
      <div className="forms_creacion">
        <h1>Editar Pokémon</h1>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            type="text"
            placeholder="Nombre"
            required
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            name="level"
            type="number"
            placeholder="Nivel (1-100)"
            required
            min="1"
            max="100"
            value={formData.level}
            onChange={handleInputChange}
          />
          <input
            name="types"
            type="text"
            placeholder="Tipos (separados por coma)"
            required
            value={formData.types}
            onChange={handleInputChange}
          />
          <input
            name="price"
            type="number"
            placeholder="Precio"
            required
            min="0"
            max="2000"
            value={formData.price}
            onChange={handleInputChange}
          />
          <input
            type="url"
            name="image"
            placeholder="URL de la imagen"
            required
            value={formData.image}
            onChange={handleInputChange}
          />

          <div className="botones-formulario">
            <button className="boton_submit" type="submit">
              Editar
            </button>
            <button className="boton_cerrar" type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPokemonModal;
