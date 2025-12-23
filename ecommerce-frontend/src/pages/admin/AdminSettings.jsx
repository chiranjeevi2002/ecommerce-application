import { useEffect, useState } from "react";
import AdminSidebar from "../../components/layout/AdminSidebar";
import AdminHeader from "../../components/layout/AdminHeader";
import SkeletonCard from "../../components/ui/SkeletonCard";

export default function AdminSettings() {
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({ name: "", theme: "light", logoUrl: "" });
  const [logoFile, setLogoFile] = useState(null);
  const { addToast } = useToast();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setLoading(true);
    try {
      const res = await adminSettingsApi.getSettings();
      setSettings(res.data || res);
    } catch (err) {
      console.error(err);
      addToast("danger", "Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const onSave = async (e) => {
    e.preventDefault();
    try {
      let updated = { ...settings };

      if (logoFile) {
        const up = await adminSettingsApi.uploadLogo(logoFile);
        if (up.data?.url) updated.logoUrl = up.data.url;
      }

      await adminSettingsApi.updateSettings(updated);
      setSettings(updated);
      addToast("success", "Settings saved");
    } catch (err) {
      console.error(err);
      addToast("danger", "Save failed");
    }
  };

  return (
    <div className="d-flex">
      <AdminSidebar />
      <div className="flex-grow-1">
        <AdminHeader />
        <div className="container mt-4">
          <h3>Store Settings</h3>

          {loading ? (
            <>
              <SkeletonCard height={30} width="30%" className="mb-3" />
              <SkeletonCard height={200} />
            </>
          ) : (
            <form onSubmit={onSave}>
              <div className="mb-3">
                <label className="form-label">Store Name</label>
                <input
                  className="form-control"
                  value={settings.name}
                  onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Theme</label>
                <select
                  className="form-select"
                  value={settings.theme}
                  onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Logo</label>
                <input type="file" accept="image/*" className="form-control" onChange={(e) => setLogoFile(e.target.files[0])} />
                {settings.logoUrl && (
                  <div className="mt-2">
                    <img src={settings.logoUrl} alt="logo" style={{ height: 80 }} />
                  </div>
                )}
              </div>

              <button className="btn btn-primary">Save Settings</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
