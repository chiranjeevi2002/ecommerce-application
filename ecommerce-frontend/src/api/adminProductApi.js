import axiosClient from "./axiosClient";
const BASE_URL = "/admin/products";
const CATEGORY_URL = "/productservice/categories";
const FILE_UPLOAD_URL = "/productservice/files/upload";

const adminProductApi = {
  
  getAll: (
    page = 0,
    size = 12,
    search = "",
    sortBy = "createdAt",
    direction = "DESC"
  ) =>
    axiosClient.get(BASE_URL, {
      params: {
        page,
        size,
        search: search || undefined,
        sortBy,
        direction,
      },
    }),

  getById: (id) => axiosClient.get(`${BASE_URL}/${id}`),
  create: (data) => axiosClient.post(BASE_URL, data),
  update: (id, data) => axiosClient.put(`${BASE_URL}/${id}`, data),
  delete: (id) => axiosClient.delete(`${BASE_URL}/${id}`),

  updateStock: (id, quantity) =>
    axiosClient.put(`${BASE_URL}/${id}/stock`, { quantity }),

  uploadImages: (files) => {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    return axiosClient.post(FILE_UPLOAD_URL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  getCategories: () => axiosClient.get(CATEGORY_URL),
  createCategory: (name) => axiosClient.post(CATEGORY_URL, { name }),
};

export default adminProductApi;