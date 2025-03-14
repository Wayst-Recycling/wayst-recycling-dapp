import axios from 'axios';

const http = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/v1`,
  withCredentials: false,
  timeout: 90000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default http;
