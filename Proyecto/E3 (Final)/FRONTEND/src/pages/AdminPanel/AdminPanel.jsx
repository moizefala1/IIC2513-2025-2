import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { admin } from "../../api/admin";
import AdminEventCard from "../../componentes/adminEventCard/adminEventCard";
import AdminUserCard from "../../componentes/adminUserCard/adminUserCard";
import AdminDetailModal from "../../componentes/adminDetailModal/adminDetailModal";
import "./AdminPanel.css";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [eventos, setEventos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalType, setModalType] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [eventosData, usuariosData] = await Promise.all([
        admin.getAllEvents(),
        admin.getAllUsers()
      ]);

      setEventos(eventosData);
      setUsuarios(usuariosData);
    } catch (err) {
      console.error("Error cargando datos de admin:", err);
      setError(err.message || "Error al cargar los datos");
      
      // Si es error 403 (no autorizado), redirigir
      if (err.status === 403) {
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEventClick = (evento) => {
    setSelectedItem(evento);
    setModalType('event');
  };

  const handleUserClick = (usuario) => {
    setSelectedItem(usuario);
    setModalType('user');
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalType(null);
  };

  if (loading) {
    return (
      <div className="admin-panel-loading">
        <div className="admin-panel-spinner"></div>
        <p>Cargando panel de administración...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-panel-error">
        <h2>⚠️ Error</h2>
        <p>{error}</p>
        <button onClick={() => navigate("/")}>Volver al inicio</button>
      </div>
    );
  }

  return (
    <>
      <div className="admin-panel-container">
        <div className="admin-panel-column">
          <div className="admin-panel-header">
            <h2>📅 Todos los Eventos</h2>
            <span className="admin-panel-count">{eventos.length} eventos</span>
          </div>
          <div className="admin-panel-content">
            {eventos.length === 0 ? (
              <div className="admin-panel-empty">
                <p>No hay eventos registrados</p>
              </div>
            ) : (
              eventos.map((evento) => (
                <AdminEventCard
                  key={evento.id}
                  evento={evento}
                  onClick={() => handleEventClick(evento)}
                />
              ))
            )}
          </div>
        </div>

        <div className="admin-panel-column">
          <div className="admin-panel-header">
            <h2>👥 Todos los Usuarios</h2>
            <span className="admin-panel-count">{usuarios.length} usuarios</span>
          </div>
          <div className="admin-panel-content">
            {usuarios.length === 0 ? (
              <div className="admin-panel-empty">
                <p>No hay usuarios registrados</p>
              </div>
            ) : (
              usuarios.map((usuario) => (
                <AdminUserCard
                  key={usuario.id}
                  usuario={usuario}
                  onClick={() => handleUserClick(usuario)}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {selectedItem && modalType && (
        <AdminDetailModal
          data={selectedItem}
          type={modalType}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default AdminPanel;
