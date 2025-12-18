import React from "react";
import "./adminUserCard.css";

const AdminUserCard = ({ usuario, onClick }) => {
  const avatarUrl = usuario.image || 
    `https://ui-avatars.com/api/?name=${encodeURIComponent(usuario.username)}&background=172e3c&color=fff&size=80`;

  return (
    <div className="admin-user-card" onClick={onClick}>
      <div className="admin-user-avatar">
        <img src={avatarUrl} alt={`Avatar de ${usuario.username}`} />
      </div>
      
      <div className="admin-user-info">
        <h4 className="admin-user-username">{usuario.username}</h4>
        <p className="admin-user-email">{usuario.email}</p>
        {usuario.username === 'admin' && (
          <span className="admin-user-badge">👑 Admin</span>
        )}
      </div>
    </div>
  );
};

export default AdminUserCard;
