import { useState } from 'react';
import { useAuth } from '../../context/authContext';
import EditProfileModal from '../../componentes/editProfile/editProfile';
import DeleteAccountModal from '../../componentes/deleteAccount/deleteAccount';
import './Profile.css';

export default function ProfilePage() {
  const { user, logout, updateUser } = useAuth();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if (!user) return null;

  const birthday = user.birthday 
    ? new Date(user.birthday).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : '—';

  const handleUpdate = (updatedUser) => {
    updateUser(updatedUser);
  };

  const handleDelete = () => {
    logout();
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <h2>Mi Perfil</h2>
        </div>

        <div className="profile-content">
          <div className="profile-info-section">
            <div className="profile-avatar">
              <img
                src={user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}&background=172e3c&color=fff&size=120`}
                alt={`Avatar de ${user.username}`}
              />
            </div>

            <div className="profile-details">
              <div className="profile-detail-item">
                <span className="profile-detail-label">Usuario:</span>
                <span className="profile-detail-value">{user.username}</span>
              </div>

              <div className="profile-detail-item">
                <span className="profile-detail-label">Email:</span>
                <span className="profile-detail-value">{user.email}</span>
              </div>

              {user.age != null && (
                <div className="profile-detail-item">
                  <span className="profile-detail-label">Edad:</span>
                  <span className="profile-detail-value">{user.age} años</span>
                </div>
              )}

              {user.birthday && (
                <div className="profile-detail-item">
                  <span className="profile-detail-label">Cumpleaños:</span>
                  <span className="profile-detail-value">{birthday}</span>
                </div>
              )}
            </div>
          </div>

          <div className="profile-actions">
            <button
              onClick={() => setShowEditModal(true)}
              className="profile-btn profile-btn-primary"
            >
              ✏️ Editar Perfil
            </button>

            <button
              onClick={logout}
              className="profile-btn profile-btn-secondary"
            >
              🚪 Cerrar Sesión
            </button>

            <button
              onClick={() => setShowDeleteModal(true)}
              className="profile-btn profile-btn-danger"
            >
              🗑️ Eliminar Cuenta
            </button>
          </div>
        </div>
      </div>

      {showEditModal && (
        <EditProfileModal
          user={user}
          onClose={() => setShowEditModal(false)}
          onUpdate={handleUpdate}
        />
      )}

      {showDeleteModal && (
        <DeleteAccountModal
          user={user}
          onClose={() => setShowDeleteModal(false)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
