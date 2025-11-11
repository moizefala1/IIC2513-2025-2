import React from 'react';
import "./miembroCard.css";


const MiembroCard = ({ miembro }) => {
    return (
        <div className="aboutus-card">
            <div className="aboutus-card_avatar">
                <img src={miembro.photo} alt={`Foto de ${miembro.name}`} className="aboutus-card_img" />
            </div>
            <div className="aboutus-card_content">
                <h3>{miembro?.name}</h3>
                {<p className="aboutus-card_role">{miembro.role}</p>}
                {<p className="aboutus-card_bio">{miembro.bio}</p>}
            </div>
        </div>
    );
};

export default MiembroCard;