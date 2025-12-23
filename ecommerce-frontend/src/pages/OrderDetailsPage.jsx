import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import orderApi from "../api/orderApi";

export default function OrderDetailsPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const BASE = "http://localhost:8080";
  useEffect(() => {
    loadOrder();
  }, []);

  const loadOrder = async () => {
    try {
      const res = await orderApi.getOrder(orderId);
      setOrder(res.data);
    } catch (err) {
      console.error("Failed to load order", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (!order) return <div className="text-center mt-5">Order not found</div>;

  return (
    <div className="container mt-4">
      <h3>Order #{order.id}</h3>
      <p className="text-muted">
        Placed on: {new Date(order.createdAt).toLocaleString()}
      </p>

      <div className="row mt-4">
        
        <div className="col-md-8">
          <h5>Items</h5>
          {order.items.map((item, index) => (
            <div className="card mb-3 shadow-sm p-3" key={index}>
              <div className="d-flex">

                <img
                  src={item.imageUrls?.[0] ? BASE + item.imageUrls[0] : "/placeholder.png"}
                  alt={item.name}
                  style={{ width: "100px", height: "100px", objectFit: "contain" }}
                  className="me-3"
                />

                <div>
                  <h6>{item.name}</h6>
                  <p>Quantity: {item.quantity}</p>
                  <p className="fw-bold">
                    ₹{item.price}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>

        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h5>Order Summary</h5>
            <hr />

            <p className="d-flex justify-content-between">
              <span>Total Amount:</span>
              <strong>₹{order.totalAmount}</strong>
            </p>

            <p className="text-muted">Payment: {order.paymentMethod}</p>
            <p className="text-muted">Status: {order.status}</p>
          </div>
        </div>

      </div>
    </div>
  );
}
