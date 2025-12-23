import { useEffect, useState } from "react";
import AdminSidebar from "../../components/layout/AdminSidebar";
import AdminHeader from "../../components/layout/AdminHeader";
import { useToast } from "../../components/toast/ToastProvider";
import SkeletonCard from "../../components/ui/SkeletonCard";
import adminCustomerApi from "../../api/adminCustomerApi";

export default function AdminCustomers() {
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [query, setQuery] = useState("");
  const { addToast } = useToast();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setLoading(true);
    try {
      const res = await adminCustomerApi.getAll({ search: query });
      setCustomers(res.data || []);
    } catch (err) {
      console.error(err);
      addToast("danger", "Failed to load customers");
    } finally {
      setLoading(false);
    }
  };

  const toggleBan = async (id, banned) => {
    try {
      if (banned) await adminCustomerApi.unban(id); else await adminCustomerApi.ban(id);
      addToast("success", banned ? "Customer unbanned" : "Customer banned");
      load();
    } catch (err) {
      console.error(err);
      addToast("danger", "Action failed");
    }
  };

  return (
    <div className="d-flex">
      <AdminSidebar />
      <div className="flex-grow-1">
        <AdminHeader />
        <div className="container mt-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3>Customers</h3>
            <div className="input-group" style={{ maxWidth: 400 }}>
              <input className="form-control" placeholder="Search customer..." value={query} onChange={(e) => setQuery(e.target.value)} />
              <button className="btn btn-outline-secondary" onClick={load}>Search</button>
            </div>
          </div>

          {loading ? (
            <>
              <SkeletonCard height={30} width="30%" className="mb-3" />
              <SkeletonCard height={200} />
            </>
          ) : (
            <table className="table table-striped">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Joined</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => (
                  <tr key={c.id}>
                    <td>{c.username}</td>
                    <td>{c.email}</td>
                    <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                    <td>{c.banned ? <span className="badge bg-danger">Banned</span> : <span className="badge bg-success">Active</span>}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-warning" onClick={() => toggleBan(c.id, c.banned)}>
                        {c.banned ? "Unban" : "Ban"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
