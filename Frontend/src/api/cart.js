import api from "./axios";

export const getCart = async () => {
  const res = await api.get("/cart/");
  return res.data;
};

export const addToCart = async (productId, qty = 1) => {
  const res = await api.post("/cart/add/", {
    product_id: productId,
    quantity: qty,
  });
  return res.data;
};
