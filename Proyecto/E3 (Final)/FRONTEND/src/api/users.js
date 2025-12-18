import { api } from './client';

export const users = {
  getAll: () => api.get('/users'),
  update: (id, payload) => api.put(`/users/${id}`, payload),
  delete: (id) => api.del(`/users/${id}`),
};
