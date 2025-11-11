import React, { useState } from "react";
import Navbar from "../navbar/navbar";
import "./crearEvento.css";
import logo from "../../assets/logo.png";

const CrearEvento = ({ setShow, setShowSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    end_date: "",
    all_day: false,
    notify: false,
    completed: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShow(false);
    setShowSuccess(true);
    //deberia usar el backend
  };

  return (
    <div className="crear-evento-body">
      <div className="crear-evento-container">
        <button 
          className="close-button" 
          onClick={() => setShow(false)}
          type="button"
        >
          ✕
        </button>
        <div className="crear-evento-logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="crear-evento-form">
          <form onSubmit={handleSubmit}>
            <h2>Crear nueva tarea</h2>

            <input
              type="text"
              name="title"
              placeholder="Título"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="description"
              placeholder="Descripción"
              value={formData.description}
              onChange={handleChange}
            />
            <p>Fecha:</p>
            <div className="date-row">
                <input
                type="date"
                name="date"
                placeholder="Fecha"
                value={formData.date}
                onChange={handleChange}
                required
                />

                <input
                type="time"
                name="time"
                placeholder="Hora"
                value={formData.time}
                onChange={handleChange}
                required
                />
            </div>
            <p>Fin:</p>
            <div className="date-row">
              <input
                type="date"
                name="end_date"
                placeholder="Fecha"
                value={formData.end_date}
                onChange={handleChange}
              />
              <input
                type="time"
                name="time"
                placeholder="Hora"
                value={formData.time}
                onChange={handleChange}
              />
            </div>

            <div className="all-day-row">
              <input
                type="checkbox"
                id="all_day"
                checked={formData.all_day}
                onChange={(e) => setFormData({ ...formData, all_day: e.target.checked })}
              />
              <label>Todo el día</label>
            </div>

            <div className="notify-row">
              <input
                type="checkbox"
                id="notify"
                checked={formData.notify}
                onChange={(e) => setFormData({ ...formData, notify: e.target.checked })}
              />
              <label>Notificar</label>
            </div>

            <button type="submit">Crear tarea</button>
          </form>
        </div>
      </div>
    </div>
  );
};      

export default CrearEvento; 