
// src/api/inventoryAdminApi.js
import axiosClient from "./axiosClient";

const inventoryAdminApi = {
  getStockList: () => axiosClient.get("/inventoryservice/admin/inventory"),

  updateStock: (productId, quantity) =>
    axiosClient.put(`/inventoryservice/admin/inventory/${productId}`, {
      quantity,
    }),
};

export default inventoryAdminApi;
