import { useState } from 'react';
import { api } from '../../api/client';
import './editProfile.css';

export default function EditProfileModal({ user, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    username: user.username || '',
    email: user.email || '',
    age: user.age || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' ? (value === '' ? '' : parseInt(value, 10)) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const changes = {};
      if (formData.username !== user.username) changes.username = formData.username;
      if (formData.email !== user.email) changes.email = formData.email;
      if (formData.age !== user.age) changes.age = formData.age;

      if (Object.keys(changes).length === 0) {
        setError('No hay cambios para guardar');
        setLoading(false);
        return;
      }

      const response = await api.put(`/users/${user.id}`, changes);
      onUpdate(response.user);
      onClose();
    } catch (err) {
      setError(err.message || 'Error al actualizar el perfil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Editar Perfil</h3>
        </div>

        <div className="modal-body">
          {error && <div className="modal-error">{error}</div>}

          <form onSubmit={handleSubmit} className="modal-form">
            <div className="modal-form-group">
              <label htmlFor="username">Nombre de usuario</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                minLength={3}
                maxLength={50}
                disabled={loading}
              />
            </div>

            <div className="modal-form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="modal-form-group">
              <label htmlFor="age">Edad</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                min={1}
                max={120}
                disabled={loading}
              />
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
                type="submit"
                className="modal-btn modal-btn-submit"
                disabled={loading}
              >
                {loading ? 'Guardando...' : 'Guardar Cambios'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
