// Frontend/src/api/axiosConfig.js
import axios from 'axios';

// Supprimez cette ligne car vous ne l'utilisez pas
// import { useAuth } from '../context/AuthContext'; // ❌ À RETIRER

// Création de l'instance Axios
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Intercepteur des requêtes : ajoute le token si disponible
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Intercepteur des réponses : gère le 401 et le refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Si le token a expiré et qu'on a un refresh token
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refresh = localStorage.getItem('refreshToken');
            
            if (refresh) {
                try {
                    // Utilisez l'instance 'api' plutôt que 'axios' directement
                    const res = await api.post('/accounts/token/refresh/', { refresh });
                    const newAccess = res.data.access;
                    localStorage.setItem('accessToken', newAccess);
                    originalRequest.headers['Authorization'] = `Bearer ${newAccess}`;
                    return api(originalRequest); // relance la requête originale
                } catch (err) {
                    // refresh échoué : logout
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    // Redirection vers login
                    if (window.location.pathname !== '/login') {
                        window.location.href = '/login';
                    }
                    return Promise.reject(err);
                }
            } else {
                // Pas de refresh token : redirection
                if (window.location.pathname !== '/login') {
                    window.location.href = '/login';
                }
            }
        }

        return Promise.reject(error);
    }
);

export default api;