import { useEffect, useState, useContext } from "react";
import orderApi from "../api/orderApi";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function OrderHistoryPage() {
  const { auth } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  const userId = auth.userId;

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const res = await orderApi.getOrdersByUser(userId);
      setOrders(res.data || []);
    } catch (err) {
      console.error("Failed to load orders", err);
    }
  };

  if (!orders.length)
    return <h4 className="text-center mt-5">No orders found</h4>;

  const statusBadge = (status) => {
    let className = "badge bg-secondary";
    if (status === "CREATED" || status === "PENDING") className = "badge bg-warning";
    if (status === "INVENTORY_RESERVED") className = "badge bg-info";
    if (status === "PAYMENT_COMPLETED") className = "badge bg-success";
    if (status === "PAYMENT_FAILED") className = "badge bg-danger";
    return <span className={className}>{status}</span>;
  };

  return (
    <div className="container mt-4">
      <h3>Your Orders</h3>
      <hr />

      {orders.map((order) => (
        <div className="card shadow-sm mb-3" key={order.id}>
          <div className="card-body d-flex justify-content-between align-items-center">

            {/* Left: Basic Info */}
            <div>
              <h5>Order #{order.id}</h5>
              <p className="text-muted mb-1">
                Placed on: {new Date(order.createdAt).toLocaleString()}
              </p>
              {statusBadge(order.status)}
            </div>

            {/* Center: Summary */}
            <div>
              <p className="mb-1">
                <strong>{order.items.length}</strong> items
              </p>
              <p className="mb-0">
                Total: <strong><i class="bi bi-currency-rupee"></i>{order.totalAmount}</strong>
              </p>
            </div>

            {/* Right: Button */}
            <div>
              <Link to={`/order/${order.id}`} className="btn btn-primary">
                View Details
              </Link>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
}
