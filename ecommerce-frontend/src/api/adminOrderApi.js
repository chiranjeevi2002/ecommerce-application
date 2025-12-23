import axiosClient from "./axiosClient";

const adminOrderApi = {
  getAll: (params = {}) =>
    axiosClient.get("/orderservice/admin/orders", { params }),

  getById: (id) =>
    axiosClient.get(`/orderservice/admin/orders/${id}`),

  updateStatus: (id, status) =>
    axiosClient.put(`/orderservice/admin/orders/${id}/status`, { status }),
};

export default adminOrderApi;
