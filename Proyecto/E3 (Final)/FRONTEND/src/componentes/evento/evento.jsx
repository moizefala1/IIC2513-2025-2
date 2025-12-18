import React from "react";
import "./evento.css";

// el formateo de fechas fue realizada con la ayuda de Claude Sonnet 4.5 !!

const Evento = ({ evento, onDelete, onComplete, onUncomplete, onEdit }) => { 
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return date.toLocaleDateString('es-ES', options);
  };

  const isAllDay = evento.all_day;
  const isCompleted = evento.Completeds && evento.Completeds.length > 0;

  const getBorderColor = () => {
    if (evento.completed) {
      return '#172e3c'; 
    } else if (evento.notify) {
      return '#FFD700'; 
    } else {
      return '#70989B'; 
    }
  };

  return (
    <div className="evento-card" style={{ borderLeft: `4px solid ${getBorderColor()}` }}>
      <div className="evento-header">
        <h3 className="evento-title">{evento.title}</h3>

        <div className="evento-actions">
          {evento.notify && <span className="evento-notify-badge">🔔</span>}

          <button
            className="evento-btn editar"
            onClick={onEdit}
          >
            ✏️
          </button>

          <button
            className="evento-btn eliminar"
            onClick={onDelete}
          >
            🗑️
          </button>

          {!isCompleted ? (
            <button
              className="evento-btn completar"
              onClick={onComplete}
            >
              ✅
            </button>
          ) : (
            <button
              className="evento-btn descompletar"
              onClick={onUncomplete}
            >
              ↩️
            </button>
          )}
        </div>
      </div>


      {evento.description && (
        <p className="evento-description">{evento.description}</p>
      )}

      <div className="evento-date-info">
        <div className="evento-date">
          <span className="evento-date-label">Inicio:</span>
          <span className="evento-date-value">
            {isAllDay ? new Date(evento.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }) : formatDate(evento.date)}
          </span>
        </div>

        {evento.end_date && (
          <div className="evento-date">
            <span className="evento-date-label">Fin:</span>
            <span className="evento-date-value">
              {isAllDay ? new Date(evento.end_date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }) : formatDate(evento.end_date)}
            </span>
          </div>
        )}

        {isAllDay && (
          <span className="evento-all-day-badge">Todo el día</span>
        )}
      </div>
    </div>
  );
};

export default Evento;