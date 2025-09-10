import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({onLogin, setCurrentUserId}) => {
  const [formData, setFormData] = useState({ name: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    setError("");
    setIsLoading(true);
    e.preventDefault(); 
    try {
      const response = await fetch("https://t1-back-2025-2-s1.onrender.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", //decimos que estamos enviando un json
        },
        body: JSON.stringify({
          name: formData.name,
          password: formData.password,
        }),
      });


      if (!response.ok) {
        if (response.status === 401) {
          setError("Contraseña incorrecta");
          setIsLoading(false);
          return; //devuelve para salir del try/catch 
        }
        else if (response.status === 500) {
          setError("Error al conectar con el servidor, revise que su contraseña tenga como mínimo 4 caracteres");
          setIsLoading(false);
          return;// devuelve para salir del try/catch 
        }
      }
      const data = await response.json();
      // si da un error que noes ni 401 ni 500, el await falla igual porque es un response.json
      //, y por lo visot en postman los errores devuelven un html, entonces entra al catch y no
      // hace falta un if response.ok
      onLogin(data);
      setIsLoading(false);
      navigate("/"); 


    } catch (error) {
      setError("Error al conectar con el servidor, inténtelo más tarde");
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }


  return (
    <div className="background">
      <div className="form">
        <img className="pokeball" src="src/assets/pokeball_negra.png"></img>
        <form onSubmit={handleSubmit}>
          <div className="sobre_input">
            <p>Nombre de usuario</p>
          </div>
          <input className="input"
            name="name"
            type="text"
            placeholder="Usuario"
            value={formData.name}
            onChange={handleInputChange}
            disabled={isLoading}
          /> 
          <div className="sobre_input">
            <p>Contraseña</p>
          </div>
          <input className="input"
            name="password"
            type="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleInputChange}
            disabled={isLoading}
          />

          <button className="submit"
            type="submit"
            disabled={
              isLoading || !formData.name.trim() || !formData.password.trim()
            }>
            {isLoading ? "Cargando..." : "Login"}
          </button>
        </form>
        {error ? (
          <div className="error" >
            {error}
          </div>
        ) : (        
        <div className="aviso">
            <p>¿No tienes cuenta? ¡No te preocues! Al iniciar sesión por primera vez, 
              tu cuenta se creará automáticamente.</p>
        </div>)}
      </div>
    </div>
  );
};

export default Login;