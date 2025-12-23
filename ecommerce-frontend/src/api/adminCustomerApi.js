import axiosClient from "./axiosClient";
const adminCustomerApi = {
  getAll: (params = {}) => axiosClient.get("/userservice/admin/customers", { params }),
  getById: (id) => axiosClient.get(`/userservice/admin/customers/${id}`),
  ban: (id) => axiosClient.put(`/userservice/admin/customers/${id}/ban`),
  unban: (id) => axiosClient.put(`/userservice/admin/customers/${id}/unban`),
};
export default adminCustomerApi;
