import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import adminOrderApi from "../../api/adminOrderApi";
import AdminSidebar from "../../components/layout/AdminSidebar";
import AdminHeader from "../../components/layout/AdminHeader";

const STATUS_FLOW = [
  "PENDING",
  "INVENTORY_RESERVED",
  "PACKED",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

export default function AdminOrderDetails() {
  const { id } = useParams();
  const BASE = "http://localhost:8080";

  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadOrder();
  }, []);

  const loadOrder = async () => {
    try {
      const res = await adminOrderApi.getById(id);
      const data = res.data || res;
      setOrder(data);
      setStatus(data.status);
    } catch (err) {
      console.error("Failed to load order", err);
    }
  };

  const updateStatus = async () => {
    try {
      await adminOrderApi.updateStatus(id, status);
      setMessage("Status updated successfully!");
      loadOrder();
      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      console.error("Update failed", err);
      setMessage("Update failed!");
    }
  };

  if (!order) return <div>Loading...</div>;

  return (
    <div className="d-flex">
      <AdminSidebar />
      <div className="flex-grow-1">
        <AdminHeader />

        <div className="container mt-4">
          <h3>Order #{order.id}</h3>

          {message && <div className="alert alert-info">{message}</div>}

          <div className="card p-3 shadow-sm mb-3">
            <h5>Update Status</h5>

            <select
              className="form-select mt-2"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              style={{ maxWidth: "250px" }}
            >
              {STATUS_FLOW.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <button className="btn btn-success mt-3" onClick={updateStatus}>
              Save Status
            </button>
          </div>

          <div className="card p-3 shadow-sm">
            <h5>Order Details</h5>
            <p>User: {order.userId}</p>
            <p>Store: {order.storeId}</p>
            <p>Total Amount: ₹{order.totalAmount}</p>

            <h6 className="mt-3">Items</h6>

            <ul className="list-group">
              {order.items.map((item, i) => {
                const img = item.imageUrls?.[0]
                  ? BASE + item.imageUrls[0]
                  : "/placeholder.png";

                return (
                  <li key={i} className="list-group-item d-flex align-items-center">
                    <img
                      src={img}
                      alt={item.name}
                      style={{ width: "60px", height: "60px", objectFit: "contain" }}
                      className="me-3"
                    />

                    <div>
                      <strong>{item.name}</strong>
                      <div>Qty: {item.quantity}</div>
                      <div>₹{item.price}</div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
