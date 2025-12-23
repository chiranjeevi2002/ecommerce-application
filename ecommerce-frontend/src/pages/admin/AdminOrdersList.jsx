import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import adminOrderApi from "../../api/adminOrderApi";
import AdminSidebar from "../../components/layout/AdminSidebar";
import AdminHeader from "../../components/layout/AdminHeader";

const STATUS_OPTIONS = [
  "ALL",
  "PENDING",
  "INVENTORY_RESERVED",
  "PACKED",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

export default function AdminOrdersList() {
  const [orders, setOrders] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [status, setStatus] = useState("ALL");
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadOrders();
  }, [page]);

  const loadOrders = async () => {
    try {
      const res = await adminOrderApi.getAll(page, 10);
      const data = res.data.content || [];
      setOrders(data);
      setFiltered(data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Failed to load orders", err);
    }
  };

  const filterOrders = () => {
    let result = [...orders];

    if (status !== "ALL") {
      result = result.filter((o) => o.status === status);
    }

    if (search.trim() !== "") {
      result = result.filter(
        (o) =>
          String(o.id).includes(search) ||
          String(o.userId).includes(search)
      );
    }

    setFiltered(result);
  };

  useEffect(() => {
    filterOrders();
  }, [status, search, orders]);

  return (
    <div className="d-flex">
      <AdminSidebar />

      <div className="flex-grow-1">
        <AdminHeader />

        <div className="container mt-4">

          <div className="d-flex justify-content-between align-items-center">
            <h3>Orders</h3>
          </div>

          <div className="row mt-3 mb-3">
            <div className="col-md-3">
              <input
                className="form-control"
                placeholder="Search by Order ID / User ID"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <select
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <table className="table table-bordered table-hover shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Total</th>
                <th>Status</th>
                <th>Placed</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((o) => (
                <tr key={o.id}>
                  <td>{o.id}</td>
                  <td>{o.userId}</td>
                  <td>₹{o.totalAmount}</td>
                  <td>
                    <span className="badge bg-primary">{o.status}</span>
                  </td>
                  <td>{new Date(o.createdAt).toLocaleString()}</td>
                  <td>
                    <Link to={`/admin/orders/${o.id}`} className="btn btn-sm btn-outline-primary">
                      Manage
                    </Link>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <nav className="mt-3">
            <ul className="pagination justify-content-center">
              <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setPage(page - 1)}>
                  Previous
                </button>
              </li>

              {Array.from({ length: totalPages }, (_, i) => (
                <li key={i} className={`page-item ${i === page ? "active" : ""}`}>
                  <button className="page-link" onClick={() => setPage(i)}>
                    {i + 1}
                  </button>
                </li>
              ))}

              <li className={`page-item ${page === totalPages - 1 ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setPage(page + 1)}>
                  Next
                </button>
              </li>
            </ul>
          </nav>

        </div>
      </div>
    </div>
  );
}
