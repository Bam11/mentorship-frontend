import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://mentorship-backend-kgfs.onrender.com', //API base
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
