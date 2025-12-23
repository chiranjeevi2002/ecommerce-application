import axiosClient from "./axiosClient";

const adminSettingsApi = {
  getSettings: () => axiosClient.get("/userservice/admin/settings"),
  updateSettings: (data) => axiosClient.put("/userservice/admin/settings", data),
  uploadLogo: (file) => {
    const fd = new FormData();
    fd.append("file", file);
    return axiosClient.post("/userservice/admin/settings/logo", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};

export default adminSettingsApi;
