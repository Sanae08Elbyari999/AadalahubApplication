import axios from 'axios';

const DEV_API_URL = 'http://localhost:8082/api/appointments'; 


const instance = axios.create({
  baseURL: DEV_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});


export const appointmentService = {
  create: async (appointmentData) => {
    try {
      const response = await instance.post('/appointments', appointmentData);
      return response.data;
    } catch (error) {
      console.error('Erreur création RDV:', error.response?.data || error.message);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await instance.get(`/appointments/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erreur récupération RDV:', error);
      throw error;
    }
  }
};
