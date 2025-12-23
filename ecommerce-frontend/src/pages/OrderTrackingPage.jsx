import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import orderApi from "../api/orderApi";
import "../styles/ordertracking.css";

export default function OrderTrackingPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrder();
  }, []);

  const loadOrder = async () => {
    try {
      const res = await orderApi.getOrder(id);
      setOrder(res.data);
    } catch (err) {
      console.error("Failed to load order", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (!order) return <div className="text-center mt-5">Order not found</div>;

  const steps = [
    { key: "PENDING", label: "Order Placed" },
    { key: "INVENTORY_RESERVED", label: "Inventory Reserved" },
    { key: "PAYMENT_COMPLETED", label: "Payment Completed" },
    { key: "SHIPPED", label: "Shipped" },
    { key: "DELIVERED", label: "Delivered" },
  ];

  const completedIndex = steps.findIndex((s) => s.key === order.status);
  const BASE = "http://localhost:8080";

  return (
    <div className="container mt-4">
      <h3>Order #{order.id}</h3>
      <p className="text-muted">
        Placed on {new Date(order.createdAt).toLocaleString()}
      </p>

      <hr />

      <div className="track-container">
        <h5>Tracking</h5>

        <div className="track mt-4 mb-4">
          {steps.map((step, index) => {
            const active = index <= completedIndex;

            return (
              <div className="track-step" key={step.key}>
                <div className={`track-icon ${active ? "active" : ""}`}></div>

                <small className={active ? "fw-bold text-success" : "text-muted"}>
                  {step.label}
                </small>

                {index < steps.length - 1 && (
                  <div className={`track-line ${active ? "active" : ""}`}></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <hr />

      <div className="mt-4">
        <h5>Items</h5>

        {order.items.map((item, i) => {
          const img =
            item.imageUrls && item.imageUrls.length > 0
              ? BASE + item.imageUrls[0]
              : "/placeholder.png";

          return (
            <div className="card shadow-sm mb-3" key={i}>
              <div className="card-body d-flex">
                <img
                  src={img}
                  alt={item.name}
                  style={{ width: "80px", height: "80px", objectFit: "contain" }}
                  className="me-3"
                />

                <div>
                  <h6>{item.name}</h6>
                  <p className="text-muted small">Qty: {item.quantity}</p>
                  <p className="fw-bold">
                    <i className="bi bi-currency-rupee"></i>
                    {item.price}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <hr />

      <div className="card p-3 shadow-sm mt-4">
        <h5>Price Summary</h5>
        <hr />

        <div className="d-flex justify-content-between">
          <span>Items:</span>
          <span>{order.items.length}</span>
        </div>

        <div className="d-flex justify-content-between">
          <span>Total Amount:</span>
          <strong>
            <i className="bi bi-currency-rupee"></i>
            {order.totalAmount}
          </strong>
        </div>
      </div>
    </div>
  );
}
