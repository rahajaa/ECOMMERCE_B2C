// X:\ecommerce_Projects\BeToo_Frontend\src\api\productService.js
import api from './axiosConfig'; // Assurez-vous que votre instance axios est correctement importée

export const getCategories = async () => {
    try {
        const response = await api.get('/products/categories/');
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};

export const getFeaturedProducts = async () => {
    try {
        // Supposons un endpoint pour les produits mis en avant.
        // Si non, vous pouvez filtrer sur is_featured=true via le ProductListCreateView
        const response = await api.get('/products/?is_featured=true&status=published');
        return response.data;
    } catch (error) {
        console.error("Error fetching featured products:", error);
        throw error;
    }
};

export const getProducts = async (filters = {}) => {
    try {
        const params = new URLSearchParams(filters).toString();
        const response = await api.get(`/products/?${params}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

export const getProductBySlug = async (slug) => {
    try {
        const response = await api.get(`/products/${slug}/`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching product with slug ${slug}:`, error);
        throw error;
    }
};

// ... (autres fonctions si vous en avez pour product variants/images, etc.)