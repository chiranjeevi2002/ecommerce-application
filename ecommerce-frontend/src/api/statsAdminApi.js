import axiosClient from "./axiosClient";

const statsAdminApi = {
  getSummary: (days = 30) =>
    axiosClient.get(`/orderservice/admin/stats/summary`, { params: { days } }),

  getSalesOverTime: (days = 30) =>
    axiosClient.get(`/orderservice/admin/stats/sales`, { params: { days } }),

  getTopCategories: (days = 30) =>
    axiosClient.get(`/orderservice/admin/stats/top-categories`, { params: { days } }),

  getTopProducts: (days = 30) =>
    axiosClient.get(`/orderservice/admin/stats/top-products`, {
      params: { days },
    }),

};

export default statsAdminApi;

