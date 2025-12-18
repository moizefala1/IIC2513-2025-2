import React from "react";
import "./adminDetailModal.css";

const AdminDetailModal = ({ data, type, onClose }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    const options = { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return date.toLocaleDateString('es-ES', options);
  };

  const renderEventDetails = () => {
    const isCompleted = data.Completeds && data.Completeds.length > 0;
    
    return (
      <div className="admin-modal-details">
        <div className="admin-modal-section">
          <h4>Información General</h4>
          <div className="admin-modal-field">
            <span className="admin-modal-label">ID:</span>
            <span className="admin-modal-value">{data.id}</span>
          </div>
          <div className="admin-modal-field">
            <span className="admin-modal-label">Título:</span>
            <span className="admin-modal-value">{data.title}</span>
          </div>
          <div className="admin-modal-field">
            <span className="admin-modal-label">Descripción:</span>
            <span className="admin-modal-value">{data.description || '—'}</span>
          </div>
          <div className="admin-modal-field">
            <span className="admin-modal-label">Estado:</span>
            <span className="admin-modal-value">
              {isCompleted ? '✅ Completado' : '⏳ Pendiente'}
            </span>
          </div>
        </div>

        <div className="admin-modal-section">
          <h4>Fechas</h4>
          <div className="admin-modal-field">
            <span className="admin-modal-label">Fecha inicio:</span>
            <span className="admin-modal-value">{formatDate(data.date)}</span>
          </div>
          {data.end_date && (
            <div className="admin-modal-field">
              <span className="admin-modal-label">Fecha fin:</span>
              <span className="admin-modal-value">{formatDate(data.end_date)}</span>
            </div>
          )}
          <div className="admin-modal-field">
            <span className="admin-modal-label">Todo el día:</span>
            <span className="admin-modal-value">{data.all_day ? 'Sí' : 'No'}</span>
          </div>
        </div>

        <div className="admin-modal-section">
          <h4>Usuario Creador</h4>
          <div className="admin-modal-field">
            <span className="admin-modal-label">Username:</span>
            <span className="admin-modal-value">{data.User?.username || '—'}</span>
          </div>
          <div className="admin-modal-field">
            <span className="admin-modal-label">Email:</span>
            <span className="admin-modal-value">{data.User?.email || '—'}</span>
          </div>
        </div>

        <div className="admin-modal-section">
          <h4>Metadatos</h4>
          <div className="admin-modal-field">
            <span className="admin-modal-label">Notificaciones:</span>
            <span className="admin-modal-value">{data.notify ? '🔔 Activadas' : 'Desactivadas'}</span>
          </div>
          <div className="admin-modal-field">
            <span className="admin-modal-label">Creado:</span>
            <span className="admin-modal-value">{formatDate(data.createdAt)}</span>
          </div>
          <div className="admin-modal-field">
            <span className="admin-modal-label">Actualizado:</span>
            <span className="admin-modal-value">{formatDate(data.updatedAt)}</span>
          </div>
        </div>
      </div>
    );
  };

  const renderUserDetails = () => {
    const birthday = data.birthday 
      ? new Date(data.birthday).toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      : '—';

    const avatarUrl = data.image || 
      `https://ui-avatars.com/api/?name=${encodeURIComponent(data.username)}&background=172e3c&color=fff&size=120`;

    return (
      <div className="admin-modal-details">
        <div className="admin-modal-user-header">
          <img 
            src={avatarUrl} 
            alt={`Avatar de ${data.username}`}
            className="admin-modal-user-avatar"
          />
          {data.username === 'admin' && (
            <span className="admin-modal-admin-badge">👑 Administrador</span>
          )}
        </div>

        <div className="admin-modal-section">
          <h4>Información Personal</h4>
          <div className="admin-modal-field">
            <span className="admin-modal-label">ID:</span>
            <span className="admin-modal-value">{data.id}</span>
          </div>
          <div className="admin-modal-field">
            <span className="admin-modal-label">Username:</span>
            <span className="admin-modal-value">{data.username}</span>
          </div>
          <div className="admin-modal-field">
            <span className="admin-modal-label">Email:</span>
            <span className="admin-modal-value">{data.email}</span>
          </div>
          {data.age && (
            <div className="admin-modal-field">
              <span className="admin-modal-label">Edad:</span>
              <span className="admin-modal-value">{data.age} años</span>
            </div>
          )}
          {data.birthday && (
            <div className="admin-modal-field">
              <span className="admin-modal-label">Cumpleaños:</span>
              <span className="admin-modal-value">{birthday}</span>
            </div>
          )}
        </div>

        <div className="admin-modal-section">
          <h4>Metadatos</h4>
          <div className="admin-modal-field">
            <span className="admin-modal-label">Registrado:</span>
            <span className="admin-modal-value">{formatDate(data.createdAt)}</span>
          </div>
          <div className="admin-modal-field">
            <span className="admin-modal-label">Última actualización:</span>
            <span className="admin-modal-value">{formatDate(data.updatedAt)}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content admin-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{type === 'event' ? '📅 Detalles del Evento' : '👤 Detalles del Usuario'}</h3>
          <button className="admin-modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          {type === 'event' ? renderEventDetails() : renderUserDetails()}
        </div>

        <div className="modal-footer">
          <button 
            className="modal-btn modal-btn-cancel" 
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDetailModal;
