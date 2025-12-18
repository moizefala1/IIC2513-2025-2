import { useEffect, useState } from 'react';
import { auth } from '../api/auth';
import { AuthCtx } from './authContext';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Al cargar la app, verifica si hay sesión (cookie)
  useEffect(() => {
    auth.me()
      .then((r) => setUser(r.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  async function login(email, password) {
    await auth.login(email, password);     // setea cookie
    const { user } = await auth.me();      // trae usuario
    setUser(user);
    return user;
  }


  async function register(payload) {
    await auth.register(payload);
    const { user } = await auth.me();
    setUser(user);
  }

  async function logout() {
    await auth.logout();                   // limpia cookie
    setUser(null);
  }

  async function updateMe(changes) {
    const r = await auth.updateMe(changes);
    setUser(r.user ?? r);
  }

  function updateUser(updatedUser) {
    setUser(updatedUser);
  }

  return (
    <AuthCtx.Provider value={{ user, loading, login, register, logout, updateMe, updateUser }}>
      {children}
    </AuthCtx.Provider>
  );
}
