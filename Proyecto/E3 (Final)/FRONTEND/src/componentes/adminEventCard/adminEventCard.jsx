import React from "react";
import "./adminEventCard.css";

const AdminEventCard = ({ evento, onClick }) => {
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

  const isCompleted = evento.Completeds && evento.Completeds.length > 0;

  return (
    <div 
      className="admin-event-card" 
      onClick={onClick}
      style={{ borderLeft: `4px solid ${isCompleted ? '#172e3c' : '#70989B'}` }}
    >
      <div className="admin-event-header">
        <h4 className="admin-event-title">{evento.title}</h4>
        {isCompleted && <span className="admin-event-badge completed">✅ Completado</span>}
      </div>

      {evento.description && (
        <p className="admin-event-description">
          {evento.description.length > 80 
            ? `${evento.description.substring(0, 80)}...` 
            : evento.description}
        </p>
      )}

      <div className="admin-event-info">
        <span className="admin-event-date">
          📅 {formatDate(evento.date)}
        </span>
        {evento.User && (
          <span className="admin-event-user">
            👤 {evento.User.username}
          </span>
        )}
      </div>
    </div>
  );
};

export default AdminEventCard;
