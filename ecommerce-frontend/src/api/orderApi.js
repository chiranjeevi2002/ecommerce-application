import axiosClient from "./axiosClient";

const orderApi = {
  createOrder: (data) => axiosClient.post("/orders", data),
  getOrder: (id) => axiosClient.get(`/orders/${id}`),
  getOrdersByUser: (userId) => axiosClient.get(`/orders/user/${userId}`),
  getMyOrders: () => axiosClient.get("/orders/my"),
  getOrderById: (id) => axiosClient.get(`/orders/${id}`),

};

export default orderApi;
