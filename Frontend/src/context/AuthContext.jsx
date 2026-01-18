// Frontend/src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axiosConfig';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Vérifie l'état de connexion au démarrage
    const checkUserStatus = async () => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            try {
                const response = await api.get('/accounts/profile/', {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
                setUser(response.data);
            } catch (err) {
                console.error('Erreur récupération profil:', err);
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                setUser(null);
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        checkUserStatus();
    }, []);

    // Fonction de login
    const login = async (email, password) => {
        try {
            const response = await api.post('/accounts/login/', { email, password });
            const { access, refresh } = response.data;
            localStorage.setItem('accessToken', access);
            localStorage.setItem('refreshToken', refresh);

            // Met à jour l'utilisateur
            await checkUserStatus();
            return true;
        } catch (err) {
            throw err; // gestion dans LoginPage
        }
    };

    // Fonction de logout
    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setUser(null);
    };

    // Rafraîchissement automatique du token
    const refreshToken = async () => {
        const refresh = localStorage.getItem('refreshToken');
        if (refresh) {
            try {
                const response = await api.post('/accounts/token/refresh/', { refresh });
                const { access } = response.data;
                localStorage.setItem('accessToken', access);
                return access;
            } catch (err) {
                logout();
            }
        }
        return null;
    };

    // Valeurs fournies par le contexte
    const value = {
        user,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
        refreshToken,
        checkUserStatus,
    };

    return (
        <AuthContext.Provider value={value}>
            {loading ? <div>Chargement de l'authentification...</div> : children}
        </AuthContext.Provider>
    );
};

// Hook pratique
export const useAuth = () => {
    return useContext(AuthContext)
};
