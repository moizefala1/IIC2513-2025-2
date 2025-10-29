import React from 'react';
import "./AboutUs.css";
import MiembroCard from "../../componentes/miembroCard/miembroCard";
import alonsoPhoto from "../../assets/fotos_miembros/3de8af6e-723d-41fa-8cf8-6d84516a7fe3.png";
import alvaroPhoto from "../../assets/fotos_miembros/Screenshot 2025-10-10 161417.png";
import rodrigoPhoto from "../../assets/fotos_miembros/Screenshot 2025-10-10 161608.png";
import juanPhoto from "../../assets/fotos_miembros/Screenshot 2025-10-10 161343.png";

const team = [
    { name: "Alonso Carrion", role: "Desarrollador", bio: "Miembro encargado del desarrollo y el sustento de la aplicación.", photo: alonsoPhoto  },
    { name: "Álvaro Panozo", role: "Desarrollador/a", bio: "Miembro encargado del desarrollo y el sustento de la aplicación.", photo: alvaroPhoto },
    { name: "Rodrigo Harrison", role: "Diseñador", bio: "Encargado del diseño y estructuración de la aplicación.", photo: rodrigoPhoto  },
    { name: "Juan Muñoz", role: "Product Owner", bio: "Encargado de orquestar el desarrollo de la aplicación.", photo: juanPhoto  },
];

const AboutUs = () => {
    return (
        <>
            <div className="aboutus-page">
                <section className="aboutus-hero">
                    <div className="aboutus-hero__inner">
                        <h1>Sobre nosotros</h1>
                        <p>Conoce al equipo detrás de Dawdle: desarrollamos soluciones enfocadas en estudiantes, con inclusión y orden en el centro.</p>
                    </div>
                </section>

                <section className="aboutus-team">
                    <div className="aboutus-team__grid">
                        {team.map((miembro, idx) => (
                            <MiembroCard 
                            miembro={miembro}
                            key={idx}
                            />
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
};

export default AboutUs;