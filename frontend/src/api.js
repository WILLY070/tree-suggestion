import axios from 'axios';
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE 
});

export async function getRecommendations(payload) {
  const res = await API.post('/recommend', payload);
  return res.data;
}
