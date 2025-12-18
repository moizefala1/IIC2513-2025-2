import React, { useEffect, useState } from "react";
import "./MainPage.css";
import Evento from "../../componentes/evento/evento";
import { useNavigate } from "react-router-dom";
import CrearEvento from "../../componentes/crearEvento/crearEvento.jsx";
import EditarEvento from "../../componentes/editarEvento/editarEvento.jsx";
import ConfirmacionCrearEvento from "../../componentes/confirmacionCrearEvento/confirmacionCrearEvento.jsx";
import ModalConfirmacion from "../../componentes/modalConfirmacion/modalConfirmacion.jsx";
import {event as eventAPI} from "../../api/event.js";
import { useAuth } from "../../context/authContext";


const MainPage = ({isLoggedIn}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCrearEvento, setShowCrearEvento] = useState(false);
  const [showEditarEvento, setShowEditarEvento] = useState(false);
  const [eventoToEdit, setEventoToEdit] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [completedEvents, setCompletedEvents] = useState([]);
  const [confirmAction, setConfirmAction] = useState(null);

  const loadEvents = async () => {
  try {
    setLoading(true);
    const data = await eventAPI.getAll();
    const allEvents = data;
    const upcoming = allEvents.filter(ev => ev.Completeds.length === 0);
    const completed = allEvents
      .filter(ev => ev.Completeds.length > 0)
      .map(ev => ({
        ...ev,
        completedAt: ev.Completeds[0]?.completed_at
      }));

    setEventos(upcoming);
    setCompletedEvents(completed);

  } catch (err) {
    console.error("Error obteniendo eventos:", err);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    if (!isLoggedIn) return navigate("/login");
    loadEvents();
  }, [isLoggedIn, navigate]);

  const deleteEvent = async (id) => {
    try {
      await eventAPI.delete(id);
      setEventos((prev) => prev.filter((ev) => ev.id !== id));
      setCompletedEvents((prev) => prev.filter((ev) => ev.id !== id));
      setConfirmAction(null);
    } catch (err) {
      console.error("Error al eliminar evento:", err);
    }
  };

  const completeEvent = async (id) => {
    try {
      await eventAPI.complete(id);
      loadEvents();
      setConfirmAction(null);
    } catch (err) {
      console.error("Error al completar evento:", err);
    }
  };

  const unCompleteEvent = async (id) => {
    try {
      await eventAPI.unComplete(id);
      loadEvents();
      setConfirmAction(null);
    } catch (err) {
      console.error("Error al descompletar evento:", err);
    }
  };

  const handleDeleteConfirm = (id) => {
    setConfirmAction({
      type: "delete",
      mensaje: "¿Estás seguro de que deseas eliminar este evento?",
      onConfirm: () => deleteEvent(id),
    });
  };

  const handleCompleteConfirm = (id) => {
    setConfirmAction({
      type: "success",
      mensaje: "¿Marcar este evento como completado?",
      onConfirm: () => completeEvent(id),
    });
  };

  const handleUncompleteConfirm = (id) => {
    setConfirmAction({
      type: "warning",
      mensaje: "¿Desmarcar este evento como completado?",
      onConfirm: () => unCompleteEvent(id),
    });
  };

  const onEventCreated = () => {
    setShowSuccess(true);
    loadEvents();
  };

  const onEventUpdated = () => {
    loadEvents();
    setEventoToEdit(null);
  };

  const handleEditEvent = (evento) => {
    setEventoToEdit(evento);
    setShowEditarEvento(true);
  };

  if (loading) return <p>Cargando eventos...</p>;

  console.log("User in MainPage:", user);
  console.log("Admin?:", user?.isAdmin);

  return (
    <>
      <div className="mainpage-container">
        <div>
          <div className="mainpage-columna_title">
            <p>Próximos eventos</p>
          </div>
          <div className="mainpage-columna_content">
            {eventos.map((evento) => (
              <Evento
                key={evento.id}
                evento={evento}
                onDelete={() => handleDeleteConfirm(evento.id)}
                onComplete={() => handleCompleteConfirm(evento.id)}
                onEdit={() => handleEditEvent(evento)}
              />
            ))}
          </div>
        </div>


        <div>
          <div className="mainpage-columna_title">
            <p>Eventos completados</p>
          </div>
          <div className="mainpage-columna_content">
            {completedEvents.map((evento) => (
              <Evento
                key={evento.id}
                evento={evento}
                onDelete={() => handleDeleteConfirm(evento.id)}
                onUncomplete={() => handleUncompleteConfirm(evento.id)}
                onEdit={() => handleEditEvent(evento)}
              />
            ))}
          </div>
        </div>


        <div className="mainpage-actions-column">
          <div className="mainpage-columna_title">
            <button onClick={() => setShowCrearEvento(true)}>+ Nueva tarea</button>
          </div>
          
          {user?.isAdmin && (
            <div className="mainpage-columna_title">
              <button 
                onClick={() => navigate("/admin")}
                className="mainpage-admin-button"
              >
                👑 Panel de Administrador
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modales */}
      {showCrearEvento && (
        <CrearEvento
          setShow={setShowCrearEvento}
          setShowSuccess={onEventCreated}
        />
      )}

      {showEditarEvento && eventoToEdit && (
        <EditarEvento
          evento={eventoToEdit}
          setShow={setShowEditarEvento}
          onEventUpdated={onEventUpdated}
        />
      )}

      {showSuccess && (
        <ConfirmacionCrearEvento setShowSuccess={setShowSuccess} />
      )}

      {confirmAction && (
        <ModalConfirmacion
          mensaje={confirmAction.mensaje}
          tipo={confirmAction.type}
          onConfirmar={confirmAction.onConfirm}
          onCancelar={() => setConfirmAction(null)}
        />
      )}
    </>
  );
};

export default MainPage;