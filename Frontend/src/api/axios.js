// Frontend/src/api/axios.js
import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/accounts";

const token = localStorage.getItem("token");

const instance = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
    Authorization: token ? `Token ${token}` : "",
  },
});

export default instance;
