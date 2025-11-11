import React from 'react';
import "./DocsPage.css";
import logo from "../../assets/logo.png";

const DocsPage = () => {
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
                    
                    {/* Sección 1: Registro e Inicio de Sesión */}
                    <section className="docs-section">
                        <h2> Registro e Inicio de Sesión</h2>
                        <div className="docs-feature">
                            <h3>Crear una cuenta</h3>
                            <p>Para comenzar a usar Dawdle 404, necesitas crear una cuenta. Ve a la página de registro y completa el formulario con tu información personal. Una vez registrado, podrás acceder a todas las funcionalidades de la aplicación.</p>
                        </div>
                        <div className="docs-feature">
                            <h3>Iniciar sesión</h3>
                            <p>Usa tu email y contraseña para acceder a tu cuenta. Puedes marcar la opción "Recordarme" para mantener tu sesión activa. Una vez dentro, tendrás acceso completo a tu panel de tareas y eventos.</p>
                        </div>
                    </section>

                    {/* Sección 2: Gestión de Eventos */}
                    <section className="docs-section">
                        <h2>Gestión de Eventos y Tareas</h2>
                        <div className="docs-feature">
                            <h3>Crear un nuevo evento</h3>
                            <p>Haz clic en el botón "+ Nueva tarea" en tu panel principal. Completa el formulario con el título, descripción, fecha y hora de tu evento. Puedes marcar si es un evento de todo el día y si quieres recibir notificaciones.</p>
                        </div>
                        <div className="docs-feature">
                            <h3>Organizar tus eventos</h3>
                            <p>En tu panel principal verás dos columnas: "Próximos eventos" y "Eventos completados". Los eventos pendientes aparecen en la primera columna, y una vez que los marques como completados, se moverán a la segunda.</p>
                        </div>
                        <div className="docs-feature">
                            <h3>Editar y eliminar eventos</h3>
                            <p>Haz clic en cualquier evento para ver sus detalles y opciones de edición. Puedes modificar la información, marcar como completado o eliminar el evento si ya no lo necesitas.</p>
                        </div>
                    </section>

                    {/* Sección 3: Navegación */}
                    <section className="docs-section">
                        <h2>Navegación en la Aplicación</h2>
                        <div className="docs-feature">
                            <h3>Barra de navegación</h3>
                            <p>La barra superior te permite acceder rápidamente a las diferentes secciones: "Mis Tareas" para tu panel principal, "Quiénes somos" para información del equipo, y "Cerrar Sesión" para salir de tu cuenta.</p>
                        </div>
                        <div className="docs-feature">
                            <h3>Páginas principales</h3>
                            <p><strong>Landing:</strong> Página de inicio con información sobre la aplicación.<br/>
                            <strong>Login/Register:</strong> Para autenticarte en la plataforma.<br/>
                            <strong>Main Page:</strong> Tu panel principal de gestión de tareas.<br/>
                            <strong>About Us:</strong> Conoce al equipo detrás de Dawdle 404.</p>
                        </div>
                    </section>

                    {/* Sección 4: Características Especiales */}
                    <section className="docs-section">
                        <h2>Características Especiales</h2>
                        <div className="docs-feature">
                            <h3>Notificaciones</h3>
                            <p>Puedes activar notificaciones para tus eventos importantes. La aplicación te recordará antes de que comience un evento para que no se te pase nada importante.</p>
                        </div>
                        <div className="docs-feature">
                            <h3>Eventos de todo el día</h3>
                            <p>Para eventos que ocupan toda la jornada (como cumpleaños, feriados, etc.), puedes marcarlos como "todo el día" para que se destaquen visualmente en tu calendario.</p>
                        </div>
                    </section>

                    {/* Sección 5: Consejos de Uso */}
                    <section className="docs-section">
                        <h2>Consejos para un Mejor Uso</h2>
                        <div className="docs-feature">
                            <h3>Organización efectiva</h3>
                            <p>Usa títulos descriptivos para tus eventos y añade descripciones detalladas. Esto te ayudará a recordar exactamente qué necesitas hacer y cuándo.</p>
                        </div>
                        <div className="docs-feature">
                            <h3>Revisión regular</h3>
                            <p>Revisa regularmente tu panel de "Próximos eventos" para mantenerte al día con tus responsabilidades. Marca como completados los eventos que ya terminaste.</p>
                        </div>
                        <div className="docs-feature">
                            <h3>Planificación anticipada</h3>
                            <p>No esperes hasta el último momento. Crea tus eventos con anticipación y activa las notificaciones para eventos importantes.</p>
                        </div>
                    </section>

                    {/* Sección 6: Soporte */}
                    <section className="docs-section">
                        <h2>Soporte y Ayuda</h2>
                        <div className="docs-feature">
                            <h3>¿Necesitas ayuda?</h3>
                            <p>Si tienes alguna pregunta o encuentras algún problema, no dudes en contactar al equipo de desarrollo. Estamos aquí para ayudarte a aprovechar al máximo tu experiencia con Dawdle 404.</p>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
};

export default DocsPage;
