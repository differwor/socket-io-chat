import axios from 'axios';

const BASE_SERVER_URL = 'http://localhost:4000/api';

const API = axios.create({
  baseURL: `${BASE_SERVER_URL}`, // Replace with your API URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;
