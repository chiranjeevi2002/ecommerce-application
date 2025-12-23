import axiosClient from "./axiosClient";

const productAdminApi = {
  getAll: () => axiosClient.get("/productservice/products"),
  create: (data) => axiosClient.post("/productservice/products", data),
  update: (id, data) => axiosClient.put(`/productservice/products/${id}`, data),
  delete: (id) => axiosClient.delete(`/productservice/products/${id}`),
  getById: (id) => axiosClient.get(`/productservice/products/${id}`),
};

export default productAdminApi;
