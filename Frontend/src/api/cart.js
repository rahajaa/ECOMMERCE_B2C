// X:\ecommerce_Projects\BeToo_Frontend\src\api\cart.js

import axiosInstance from './axiosConfig'; // Importez votre instance Axios configurée

/**
 * Récupère le contenu actuel du panier de l'utilisateur.
 * @returns {Promise<Object>} Une promesse qui résout avec les données du panier.
 * @throws {Error} Si la récupération du panier échoue.
 */
export const getCart = async () => {
    try {
        const response = await axiosInstance.get('/cart/');
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération du panier:", error);
        // Standardisation du message d'erreur
        const errorMessage = error.response?.data?.detail || error.message || "Échec de la récupération du panier.";
        throw new Error(errorMessage);
    }
};

/**
 * Ajoute une variante de produit au panier de l'utilisateur.
 * Si la variante existe déjà dans le panier, la quantité est augmentée.
 * @param {number} variantId - L'ID de la variante du produit à ajouter.
 * @param {number} [quantity=1] - La quantité à ajouter (par défaut à 1).
 * @returns {Promise<Object>} Une promesse qui résout avec les données de l'article de panier ajouté/mis à jour.
 * @throws {Error} Si l'ajout au panier échoue.
 */
export const addToCart = async (variantId, quantity = 1) => {
    try {
        const response = await axiosInstance.post('/cart/add/', {
            variant_id: variantId,
            quantity: quantity,
        });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de l'ajout au panier:", error);
        // Standardisation du message d'erreur
        const errorMessage = error.response?.data?.detail || error.message || "Échec de l'ajout au panier.";
        throw new Error(errorMessage);
    }
};

/**
 * Met à jour la quantité d'un article spécifique dans le panier.
 * @param {number} itemId - L'ID de l'article du panier à mettre à jour.
 * @param {number} quantity - La nouvelle quantité pour cet article.
 * @returns {Promise<Object>} Une promesse qui résout avec les données de l'article de panier mis à jour.
 * @throws {Error} Si la mise à jour de l'article du panier échoue.
 */
export const updateCartItem = async (itemId, quantity) => {
    try {
        const response = await axiosInstance.patch(`/cart/update-item/${itemId}/`, {
            quantity: quantity,
        });
        return response.data;
    } catch (error) {
        console.error(`Erreur lors de la mise à jour de l'article ${itemId} du panier:`, error);
        // Standardisation du message d'erreur
        const errorMessage = error.response?.data?.detail || error.message || "Échec de la mise à jour de l'article du panier.";
        throw new Error(errorMessage);
    }
};

/**
 * Supprime un article spécifique du panier.
 * @param {number} itemId - L'ID de l'article du panier à supprimer.
 * @returns {Promise<void>} Une promesse qui résout une fois l'article supprimé (ou une réponse vide).
 * @throws {Error} Si la suppression de l'article du panier échoue.
 */
export const removeCartItem = async (itemId) => {
    try {
        const response = await axiosInstance.delete(`/cart/remove-item/${itemId}/`);
        return response.data; // Souvent une réponse vide pour un DELETE réussi (statut 204 No Content)
    } catch (error) {
        console.error(`Erreur lors de la suppression de l'article ${itemId} du panier:`, error);
        // Standardisation du message d'erreur
        const errorMessage = error.response?.data?.detail || error.message || "Échec de la suppression de l'article du panier.";
        throw new Error(errorMessage);
    }
};
