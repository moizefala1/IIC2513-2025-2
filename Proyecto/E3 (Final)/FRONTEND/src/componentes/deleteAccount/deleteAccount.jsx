import { useState } from 'react';
import { api } from '../../api/client';
import { useNavigate } from 'react-router-dom';
import '../editProfile/editProfile.css';

export default function DeleteAccountModal({ user, onClose, onDelete }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (confirmation !== user.username) {
      setError('El nombre de usuario no coincide');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await api.del(`/users/${user.id}`);
      onDelete(); 
      navigate('/');
    } catch (err) {
      setError(err.message || 'Error al eliminar la cuenta');
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Eliminar Cuenta</h3>
        </div>

        <div className="modal-body">
          <div className="modal-warning">
            <strong>⚠️ ¡Advertencia!</strong>
            Esta acción es permanente y no se puede deshacer. Todos tus datos, eventos y notificaciones serán eliminados.
          </div>

          {error && <div className="modal-error">{error}</div>}

          <div className="modal-form">
            <div className="modal-form-group">
              <label htmlFor="confirmation">
                Para confirmar, escribe tu nombre de usuario: <strong>{user.username}</strong>
              </label>
              <input
                type="text"
                id="confirmation"
                value={confirmation}
                onChange={(e) => setConfirmation(e.target.value)}
                placeholder={user.username}
                disabled={loading}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              onClick={onClose}
              className="modal-btn modal-btn-cancel"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="modal-btn modal-btn-danger"
              disabled={loading || confirmation !== user.username}
            >
              {loading ? 'Eliminando...' : 'Eliminar Cuenta'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
