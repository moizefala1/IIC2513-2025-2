import React, { useState, useEffect } from "react";
import "./CreatePokemonModal.css";
const CreatePokemonModal = ({ isOpen, onClose, onCreate }) => {

  const [formData, setFormData] = useState({ name: "", level: "", types: "", price: "", image: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(formData);
  };

  return (
    <div className="fondo">
      <div className="forms_creacion">
        <h1>Crear Pokémon</h1>
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
           min ="1"
           max= "100"
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
           <input type="url"
           name="image" 
           placeholder="URL de la imagen" 
           required
           value={formData.image}
           onChange={handleInputChange}
           />
          <div className="botones-formulario">
            <button className="boton_submit" type="submit">Crear</button>
            <button className="boton_cerrar" onClick={onClose}>Cancelar</button>
          </div>
         </form>
      </div>
    </div>
  );
};

export default CreatePokemonModal;
