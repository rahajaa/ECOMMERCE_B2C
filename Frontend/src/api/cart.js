import api from "./axios";

// Récupère le panier (gère l'utilisateur connecté ou la session via ton backend)
export const getCart = async () => {
  const res = await api.get("/cart/");
  return res.data;
};

// CORRECTION : On utilise variant_id pour matcher ton backend
export const addToCart = async (variantId, qty = 1) => {
  const res = await api.post("/cart/add/", {
    variant_id: variantId, // Changé de product_id à variant_id
    quantity: qty,
  });
  return res.data;
};

// AJOUT : Utile pour ton bouton "Supprimer"
export const removeFromCart = async (itemId) => {
    const res = await api.delete(`/cart/item/${itemId}/remove/`);
    return res.data;
};