import { useEffect, useState } from "react";
// import orderAdminApi from "../../api/orderAdminApi";
import AdminSidebar from "../../components/layout/AdminSidebar";
import AdminHeader from "../../components/layout/AdminHeader";
import { Link } from "react-router-dom";
import adminOrderApi from "../../api/adminOrderApi";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const res = await adminOrderApi.getAll({});
      setOrders(res.data || []);
    } catch (err) {
      console.error("Failed to load orders", err);
    } finally {
      setLoading(false);
    }
  };

  const badge = (status) => {
    const map = {
      PENDING: "warning",
      INVENTORY_RESERVED: "info",
      PAYMENT_COMPLETED: "success",
      PAYMENT_FAILED: "danger",
      SHIPPED: "primary",
      DELIVERED: "dark",
    };

    return <span className={`badge bg-${map[status] || "secondary"}`}>{status}</span>;
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="d-flex">
      <AdminSidebar />

      <div className="flex-grow-1">
        <AdminHeader />

        <div className="container mt-4">
          <h3>All Orders</h3>
          <hr />

          <table className="table table-hover shadow-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Total</th>
                <th>Status</th>
                <th>Created</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td>{o.id}</td>
                  <td>{o.userId}</td>
                  <td>₹{o.totalAmount}</td>
                  <td>{badge(o.status)}</td>
                  <td>{new Date(o.createdAt).toLocaleString()}</td>
                  <td className="text-end">
                    <Link
                      to={`/admin/orders/${o.id}`}
                      className="btn btn-sm btn-primary"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
}

