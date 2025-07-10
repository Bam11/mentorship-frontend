import axios from 'axios';

const BASE_URL = 'https://mentorship-backend-kgfs.onrender.com'; // API BASE

const api = axios.create({
  baseURL: BASE_URL,
});

// Automatically attach token from localStorage 
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
