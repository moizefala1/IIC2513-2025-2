import { api } from './client';
import { saveEvents, getEvents, deleteEventDB } from "../utils/indexedDB";

export const event = {
  getAll: async () => {
    try {
      const data = await api.get('/events');

      // Guardar en IndexedDB
      await saveEvents(data);

      return data;
    } catch (err) {
      console.error("❗ API offline, usando IndexedDB", err);
      return await getEvents();
    }
  },
  getById: (id) => api.get(`/events/${id}`),
  create: async (payload) => {
    try {
      const ev = await api.post('/events', payload);
      await saveEvents([ev]); // 👉 guardar en IndexedDB
      return ev;
    } catch (err) {
      console.error("Error creando offline: requiere sincronización");
      throw err;
    }
  },
  update: (id, payload) => api.put(`/events/${id}`, payload),
  delete: async (id) => {
    try {
      await api.del(`/events/${id}`);
      await deleteEventDB(id);
    } catch (err) {
      console.error("Error offline => marcar para sync", err);
    }
  },
  complete: async (id) => {
    const ev = await api.post(`/events/${id}/complete`);
    await saveEvents([ev]);
    return ev;
  },

  unComplete: async (id) => {
    const ev = await api.del(`/events/${id}/complete`);
    await saveEvents([ev]);
    return ev;
  },

};