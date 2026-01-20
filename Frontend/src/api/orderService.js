// src/api/orderService.js
import api from "./axios";

export const createOrder = async (payload) => {
  const res = await api.post("/orders/", payload);
  return res.data;
};

export const getOrders = async () => {
  const res = await api.get("/orders/");
  return res.data;
};
