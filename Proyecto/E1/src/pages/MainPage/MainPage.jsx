import React, { useEffect, useState } from "react";
import "./MainPage.css";
import Evento from "../../componentes/evento/evento";
import { useNavigate } from "react-router-dom";
import CrearEvento from "../../componentes/crearEvento/crearEvento.jsx";
import ConfirmacionCrearEvento from "../../componentes/confirmacionCrearEvento/confirmacionCrearEvento.jsx";


const MainPage = ({isLoggedIn}) => {
  const navigate = useNavigate();
  const [showCrearEvento, setShowCrearEvento] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const eventosEjemplo = [
    {
      id: 1,
      title: "Reunión de equipo",
      description: "Revisión del proyecto y planificación del sprint",
      date: "2025-10-24T10:00:00",
      end_date: "2025-10-24T11:30:00",
      all_day: false,
      notify: true,
      completed: false
    },
    {
      id: 2,
      title: "Entrega final del proyecto",
      description: "Presentación del proyecto Los-404",
      date: "2025-10-30T00:00:00",
      end_date: null,
      all_day: true,
      notify: false,
      completed: false
    },
    {
      id: 3,
      title: "Configurar base de datos",
      description: "Configuración de la base de datos para el proyecto",
      date: "2025-10-22T15:00:00",
      end_date: "2025-10-22T16:00:00",
      all_day: false,
      notify: false,
      completed: true
    },
    {
      id: 4,
      title: "Meetup de desarrollo",
      description: "Reunión de desarrolladores para discutir el proyecto",
      date: "2025-10-26T10:00:00",
      end_date: "2025-10-26T11:00:00",
      all_day: false,
      notify: true,
      completed: true
    }
  ];

  return (
    <>
    <div className="mainpage-container">
      <div>
        <div className="mainpage-columna_title">
          <p>Próximos eventos</p>
        </div>
        <div className="mainpage-columna_content">
          {eventosEjemplo
            .filter((evento) => evento.completed === false)
            .map((evento) => (
              <Evento key={evento.id} evento={evento} />
            ))}
        </div>
      </div>
        
      <div>
        <div className="mainpage-columna_title">
          <p>Eventos completados</p>
        </div>
        <div className="mainpage-columna_content">
          {eventosEjemplo
            .filter((evento) => evento.completed === true)
            .map((evento) => (
              <Evento key={evento.id} evento={evento} />
            ))}
        </div>
      </div>  

      <div>
         <div className="mainpage-columna_title">
          <button onClick={() => setShowCrearEvento(true)}>+ Nueva tarea</button>
        </div>
        <div className="mainpage-columna_content">
        </div>
      </div>

    </div>
    {showCrearEvento && (
      <CrearEvento
        setShow={setShowCrearEvento}
        setShowSuccess={setShowSuccess}
      />
    )}

    {showSuccess && (
      <ConfirmacionCrearEvento setShowSuccess={setShowSuccess} />
    )}

    </>
  );
};

export default MainPage