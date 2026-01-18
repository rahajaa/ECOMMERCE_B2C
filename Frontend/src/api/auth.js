// X:\ecommerce_Projects\BeToo_Frontend\src\api\auth.js

import axiosInstance from './axiosConfig'; // Importez votre instance Axios configurée
import axios from './axios';

// Exportation nommée de la fonction loginUser
export const loginUser = async (username, password) => {
  try {
    const response = await axiosInstance.post('/token/', { username, password });
    // Stockez les tokens si la connexion réussit
    localStorage.setItem('accessToken', response.data.access);
    localStorage.setItem('refreshToken', response.data.refresh);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Erreur réseau');
  }
};

// Exportation nommée de la fonction registerUser
export const registerUser = async (username, email, password, password2) => {
  try {
    const response = await axiosInstance.post('/accounts/register/', { username, email, password, password2 });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Erreur réseau');
  }
};

// Exportation nommée de la fonction getUserProfile
export const getUserProfile = async () => {
  try {
    const response = await axiosInstance.get('/accounts/profile/');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Erreur réseau');
  }
};

// Exportation nommée de la fonction logoutUser
export const logoutUser = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  // Vous pouvez aussi appeler une API de déconnexion si votre backend en a une
};

// Exportation nommée de la fonction isAuthenticated
export const isAuthenticated = () => {
  const accessToken = localStorage.getItem('accessToken');
  // Logique simple: si un token existe, l'utilisateur est considéré comme authentifié
  // Pour une vérification plus robuste, vous devriez décoder le token et vérifier son expiration
  return !!accessToken; 
};

const authAPI = {
    login: (data) => axios.post('/api/token/', data), // Django REST JWT endpoint
    register: (data) => axios.post('/api/accounts/register/', data),
};