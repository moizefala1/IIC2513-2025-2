import React, { useState } from "react";
import Navbar from "../navbar/navbar";
import "./crearEvento.css";
import logo from "../../assets/logo.png";
import { event as eventAPI } from "../../api/event.js";

const CrearEvento = ({ setShow, setShowSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    end_date: "",
    time: "",
    end_time: "",
    all_day: false,
    notify: false,
    completed: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const startDateTime = formData.all_day
        ? `${formData.date}T00:00:00`
        : `${formData.date}T${formData.time}:00`;

      let endDateTime = null;
      if (formData.end_date) {
        endDateTime = formData.all_day
          ? `${formData.end_date}T23:59:00`
          : `${formData.end_date}T${formData.end_time}:00`;
      }

      const payload = {
        title: formData.title,
        description: formData.description,
        date: startDateTime,
        end_date: endDateTime,
        all_day: formData.all_day,
        notify: formData.notify,
      };

      await eventAPI.create(payload);
      setShow(false);
      setShowSuccess(true);
    } catch (err) {
      console.error("Error creando evento:", err);
      alert("Error creando evento");
    }
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
                value={formData.date}
                onChange={handleChange}
                required
              />

              <input
                type="time"
                name="time"
                disabled={formData.all_day}
                value={formData.time}
                onChange={handleChange}
                required={!formData.all_day}
              />
            </div>

            <p>Fin:</p>
            <div className="date-row">
              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
              />

              <input
                type="time"
                name="end_time"
                disabled={formData.all_day}
                value={formData.end_time}
                onChange={handleChange}
                required={!formData.all_day && formData.end_date !== ""} 
              />
            </div>

            <div className="all-day-row">
              <input
                type="checkbox"
                id="all_day"
                checked={formData.all_day}
                onChange={(e) =>
                  setFormData({ ...formData, all_day: e.target.checked })
                }
              />
              <label>Todo el día</label>
            </div>

            <div className="notify-row">
              <input
                type="checkbox"
                id="notify"
                checked={formData.notify}
                onChange={(e) =>
                  setFormData({ ...formData, notify: e.target.checked })
                }
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
