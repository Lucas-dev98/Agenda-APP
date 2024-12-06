import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
});

export const getAppointments = async () => {
  const response = await api.get('/appointments');
  return response.data;
};

export const addAppointment = async (appointment) => {
  const response = await api.post('/appointments', appointment);
  return response.data;
};

export const chatWithLlama2 = async (message, request, temperature, maxTokens, topP, repetitionPenalty) => {
  const response = await api.post('/llama2', {
    message,
    request,
    temperature,
    maxTokens,
    topP,
    repetitionPenalty
  });
  return response.data;
};