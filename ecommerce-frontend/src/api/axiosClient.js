import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  // baseURL: "http://localhost:8080",
});

axiosClient.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  const storeId = sessionStorage.getItem("storeId");
  const userId = sessionStorage.getItem("userId");
  const username = sessionStorage.getItem("username");
  const roles = sessionStorage.getItem("roles");

  if (token) config.headers.Authorization = `Bearer ${token}`;
  if (storeId) config.headers["X-Store-Id"] = storeId;
  if (userId) config.headers["X-User-Id"] = userId;
  if (username) config.headers["X-User-Name"] = username;
  if (roles) config.headers["X-User-Roles"] = roles;
  return config;
});

export default axiosClient;
