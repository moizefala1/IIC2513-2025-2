import React from 'react';
import "./DocsPage.css";
import logo from "../../assets/logo.png";
import { useEffect, useRef } from 'react';

const DocsPage = () => {
    const featureRefs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("fade-in");
                        entry.target.classList.remove("fade-hidden");
                    } else {
                        entry.target.classList.remove("fade-in");
                        entry.target.classList.add("fade-hidden");
                    }
                });
            },
            { threshold: 0.2 }
        );

        featureRefs.current.forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    featureRefs.current = [];
    let refCounter = 0;



    return (
        <div className="docs-page">
            {/* Hero Section */}
            <div className="docs-hero">
                <div className="docs-hero__inner">
                    <div className="docs-logo">
                        <img src={logo} alt="Dawdle 404" />
                    </div>
                    <h1>¿Cómo funciona?</h1>
                    <p>Guía completa para aprovechar al máximo tu experiencia con Dawdle 404</p>
                </div>
            </div>
            {/* Content Section */}
            <div className="docs-content">
                <div className="docs-content__inner">

                    {[
                        {
                            title: "Registro e Inicio de Sesión",
                            features: [
                                {
                                    h: "Crear una cuenta",
                                    p: "Para comenzar a usar Dawdle 404, necesitas crear una cuenta. Ve a la página de registro y completa el formulario con tu información personal. Una vez registrado, podrás acceder a todas las funcionalidades de la aplicación."
                                },
                                {
                                    h: "Iniciar sesión",
                                    p: "Usa tu email y contraseña para acceder a tu cuenta. Puedes marcar la opción \"Recordarme\" para mantener tu sesión activa. Una vez dentro, tendrás acceso completo a tu panel de tareas y eventos."
                                }
                            ]
                        },
                        {
                            title: "Gestión de Eventos y Tareas",
                            features: [
                                {
                                    h: "Crear un nuevo evento",
                                    p: "Haz clic en el botón \"+ Nueva tarea\" en tu panel principal. Completa el formulario con el título, descripción, fecha y hora de tu evento. Puedes marcar si es un evento de todo el día y si quieres recibir notificaciones."
                                },
                                {
                                    h: "Organizar tus eventos",
                                    p: "En tu panel principal verás dos columnas: \"Próximos eventos\" y \"Eventos completados\". Los eventos pendientes aparecen en la primera columna, y una vez que los marques como completados, se moverán a la segunda."
                                },
                                {
                                    h: "Editar y eliminar eventos",
                                    p: "Haz clic en cualquier evento para ver sus detalles y opciones de edición. Puedes modificar la información, marcar como completado o eliminar el evento si ya no lo necesitas."
                                }
                            ]
                        },
                        {
                            title: "Navegación en la Aplicación",
                            features: [
                                {
                                    h: "Barra de navegación",
                                    p: "La barra superior te permite acceder rápidamente a las diferentes secciones: \"Mis Tareas\" para tu panel principal, \"Quiénes somos\" para información del equipo, y \"Cerrar Sesión\" para salir de tu cuenta."
                                },
                                {
                                    h: "Páginas principales",
                                    p:  <>
                                            <strong>Landing:</strong> Página de inicio con información general de la aplicación.<br />
                                            <strong>Login/Register:</strong> Secciones para crear una cuenta o iniciar sesión.<br />
                                            <strong>Main Page:</strong> Tu panel principal para gestionar tareas y eventos.<br />
                                            <strong>About Us:</strong> Página donde puedes conocer al equipo detrás de Dawdle 404.
                                        </>
                                }
                            ]
                        },
                        {
                            title: "Características Especiales",
                            features: [
                                {
                                    h: "Notificaciones",
                                    p: "Puedes activar notificaciones para tus eventos importantes. La aplicación te recordará antes de que comience un evento para que no se te pase nada importante."
                                },
                                {
                                    h: "Eventos de todo el día",
                                    p: "Para eventos que ocupan toda la jornada (como cumpleaños, feriados, etc.), puedes marcarlos como \"todo el día\" para que se destaquen visualmente en tu calendario."
                                }
                            ]
                        },
                        {
                            title: "Consejos para un Mejor Uso",
                            features: [
                                {
                                    h: "Organización efectiva",
                                    p: "Usa títulos descriptivos para tus eventos y añade descripciones detalladas. Esto te ayudará a recordar exactamente qué necesitas hacer y cuándo."
                                },
                                {
                                    h: "Revisión regular",
                                    p: "Revisa regularmente tu panel de \"Próximos eventos\" para mantenerte al día con tus responsabilidades. Marca como completados los eventos que ya terminaste."
                                },
                                {
                                    h: "Planificación anticipada",
                                    p: "No esperes hasta el último momento. Crea tus eventos con anticipación y activa las notificaciones para eventos importantes."
                                }
                            ]
                        },
                        {
                            title: "Soporte y Ayuda",
                            features: [
                                {
                                    h: "¿Necesitas ayuda?",
                                    p: "Si tienes alguna pregunta o encuentras algún problema, no dudes en contactar al equipo de desarrollo. Estamos aquí para ayudarte a aprovechar al máximo tu experiencia con Dawdle 404."
                                }
                            ]
                        }
                    ].map((section, sectionIndex) => (
                        <section className="docs-section" key={sectionIndex}>
                            <h2>{section.title}</h2>

                            {section.features.map((feat, featIndex) => (
                                <div
                                    key={featIndex}
                                    className="docs-feature fade-hidden"
                                    ref={el => featureRefs.current[refCounter++] = el}
                                >
                                    <h3>{feat.h}</h3>
                                    <p>{feat.p}</p>
                                </div>
                            ))}
                        </section>
                    ))}

                </div>
            </div>
        </div>
    );
};

export default DocsPage;
