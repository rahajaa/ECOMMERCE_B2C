// X:\ecommerce_Projects\BeToo_Frontend\src\api\userService.js (Mis à jour pour getUserProfile)
import api from './axiosConfig';

export const getUserProfile = async (userId) => {
    try {
        // Supposons que l'endpoint pour récupérer le profil est '/accounts/profile/'
        // ou '/accounts/users/{userId}/' si vous avez une API RESTful par ID
        // Pour un profil utilisateur simple, souvent, on peut juste appeler /accounts/profile/
        // avec un token d'authentification et le backend déduit l'utilisateur.
        const response = await api.get('/accounts/profile/'); // Endpoint générique pour le profil de l'utilisateur connecté
        return response.data;
    } catch (error) {
        console.error("Error fetching user profile:", error);
        throw error;
    }
};

// ... vos autres fonctions d'authentification et de rafraîchissement
export const loginUser = async (email, password) => {
    // ... (votre code existant pour login)
};

export const registerUser = async (email, password, password2) => {
    // ... (votre code existant pour register)
};

export const refreshToken = async (refreshTokenValue) => {
    // ... (votre code existant pour refresh token)
};