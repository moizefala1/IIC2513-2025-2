import { api } from './client';

export const admin = {
  getAllEvents: () => api.get('/events/all'),
  getAllUsers: () => api.get('/users'),
};
