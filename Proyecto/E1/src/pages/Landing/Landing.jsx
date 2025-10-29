import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Landing.css";
import logo from "../../assets/logo.png";

const Landing = ({isLoggedIn, user}) => {
    const navigate = useNavigate(); 
    return (
        <>
        <div className="landing">
            <div className="container_landing">
                <div className= "foto">
                    <img src={logo} alt="Dawdle" />
                </div>
                {isLoggedIn ? (
                    <div className="welcome_message">
                        <h2>¡Bienvenido de nuevo, <span className="user">{user}</span>!</h2>
                    </div>
                ) : (
                    <div className="botones">
                        <button onClick={() => {navigate('/login')}} 
                        className= "iniciar_sesion">Iniciar Sesión</button>
                        <button onClick={() => {navigate('/register')}} 
                        className= "registro">Registrarse</button>
                        <button onClick={() => {navigate('/about-us')}}
                        className= "about_us">Quiénes somos</button>
                        <button onClick={() => {navigate('/docs')}}
                        className= "docs">¿Cómo funciona?</button>
                    </div>
                )}

            </div>
            <div className="landing_footer">
                <div className="footer_inner">
                    <header className="footer_header">
                        <h2>¿Qué es Dawdle?</h2>
                        <p>El orden es poder</p>
                    </header>
                    <div className="features">
                        <article className="feature">
                            <div className="feature_icon">
 
                            </div>
                            <div className="feature_content">
                                <h3>Planificador de tu día a día</h3>
                                <p>
                                    Nuestro planner convierte el caos en claridad: prioriza lo importante, divide proyectos en pasos simples y
                                    te muestra tu semana de un vistazo. Con recordatorios oportunos, fechas límite visibles y bloques de tiempo, transformas 
                                    los pendientes en logros diarios. Planifica en segundos, ajusta sobre la marcha y mantén el foco
                                    en lo que realmente te hace avanzar.
                                </p>
                            </div>
                        </article>
                        <article className="feature">
                            <div className="feature_icon">
  
                            </div>
                            <div className="feature_content">
                                <h3>¿Porque Dawdle?</h3>
                                <p>En inglés, dawdle es sinónimo de procrastinar, dar vueltas o postergar. 404 es el famoso código de internet que significa “not found”. 
                                    Juntos, Dawdle 404 expresa nuestra promesa: "procrastinación not found”. Queremos que lo que hoy se pierde
                                    entre pendientes y plazos, mañana esté claro, ordenado y bajo control.</p>
                            </div>
                        </article>
                        <article className="feature">
                            <div className="feature_icon">
                
                            </div>
                            <div className="feature_content">
                                <h3>Enfoque universitario</h3>
                                <p>Ayudamos a estudiantes universitarios a trabajar de manera óptima, reducir su carga académica y mental, y recuperar tiempo de calidad. Convertimos la ansiedad por lo que “falta” en un plan simple y accionable.</p>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Landing;