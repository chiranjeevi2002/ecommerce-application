// src/api/adminRoleApi.js
import axiosClient from "./axiosClient";

const adminRoleApi = {
  getAll: () => axiosClient.get("/admin/roles"),
};

export default adminRoleApi;
