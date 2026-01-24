import axios from "axios";

const api = axios.create({
  baseURL: 'http://10.96.131.99:9000/api',
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;