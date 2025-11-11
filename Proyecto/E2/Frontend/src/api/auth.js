import { api } from './client';

export const auth = {
  register: (payload) => api.post('/auth/register', payload),
  login: (email, password) => api.post('/auth/login', { email, password }),
  me: () => api.get('/auth/me'),
  logout: () => api.post('/auth/logout'),
  updateMe: (changes) => api.put('/users/me', changes),
};
