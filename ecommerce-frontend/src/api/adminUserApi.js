// src/api/adminUserApi.js
import axiosClient from "./axiosClient";

const adminUserApi = {
  list: (params) => axiosClient.get("/admin/users", { params }),
  get: (id) => axiosClient.get(`/admin/users/${id}`),
  updateRoles: (payload) => axiosClient.put("/admin/users/update-roles", payload),
};

export default adminUserApi;
