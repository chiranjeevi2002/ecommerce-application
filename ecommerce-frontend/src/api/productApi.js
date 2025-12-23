import axiosClient from "./axiosClient";
const productApi = {
  getAll: (page = 0, size = 12) => axiosClient.get(`/products?page=${page}&size=${size}`),
  getById: (id) => axiosClient.get(`/products/${id}`),
  search: (query, page = 0, size = 12) => axiosClient.get(`/products/search?name=${query}&page=${page}&size=${size}`),
};
export default productApi;
//GET /products/search?name=flower

