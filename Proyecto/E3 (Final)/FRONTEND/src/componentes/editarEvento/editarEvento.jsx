import React, { useState, useEffect } from "react";
import "./editarEvento.css";
import logo from "../../assets/logo.png";
import ModalConfirmacion from "../modalConfirmacion/modalConfirmacion.jsx";
import { event as eventAPI } from "../../api/event.js";

const EditarEvento = ({ evento, setShow, onEventUpdated }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    end_date: "",
    time: "",
    end_time: "",
    all_day: false,
    notify: false,
  });
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (evento) {
      // Parsear fecha de inicio
      const startDate = new Date(evento.date);
      const dateStr = startDate.toISOString().split('T')[0];
      const timeStr = startDate.toTimeString().slice(0, 5);

      // Parsear fecha de fin si existe
      let endDateStr = "";
      let endTimeStr = "";
      if (evento.end_date) {
        const endDate = new Date(evento.end_date);
        endDateStr = endDate.toISOString().split('T')[0];
        endTimeStr = endDate.toTimeString().slice(0, 5);
      }

      setFormData({
        title: evento.title || "",
        description: evento.description || "",
        date: dateStr,
        end_date: endDateStr,
        time: timeStr,
        end_time: endTimeStr,
        all_day: evento.all_day || false,
        notify: evento.notify || false,
      });
    }
  }, [evento]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const confirmSave = async () => {
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

      await eventAPI.update(evento.id, payload);
      setShow(false);
      onEventUpdated();
    } catch (err) {
      console.error("Error actualizando evento:", err);
      alert("Error actualizando evento");
      setShowConfirm(false);
    }
  };

  return (
    <div className="editar-evento-body">
      <div className="editar-evento-container">
        <button
          className="close-button"
          onClick={() => setShow(false)}
          type="button"
        >
          ✕
        </button>

        <div className="editar-evento-logo">
          <img src={logo} alt="Logo" />
        </div>

        <div className="editar-evento-form">
          <form onSubmit={handleSubmit}>
            <h2>Editar tarea</h2>

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
                id="all_day_edit"
                checked={formData.all_day}
                onChange={(e) =>
                  setFormData({ ...formData, all_day: e.target.checked })
                }
              />
              <label htmlFor="all_day_edit">Todo el día</label>
            </div>

            <div className="notify-row">
              <input
                type="checkbox"
                id="notify_edit"
                checked={formData.notify}
                onChange={(e) =>
                  setFormData({ ...formData, notify: e.target.checked })
                }
              />
              <label htmlFor="notify_edit">Notificar</label>
            </div>

            <button type="submit">Guardar cambios</button>
          </form>
        </div>
      </div>

      {showConfirm && (
        <ModalConfirmacion
          mensaje="¿Estás seguro de guardar los cambios realizados?"
          tipo="warning"
          onConfirmar={confirmSave}
          onCancelar={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
};

export default EditarEvento; 