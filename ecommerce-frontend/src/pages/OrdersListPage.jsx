import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import orderApi from "../api/orderApi";

export default function OrdersListPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            const res = await orderApi.getMyOrders();
            setOrders(res.data || []);
        } catch (err) {
            console.error("Failed to load orders", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="text-center mt-5">Loading...</div>;

    if (orders.length === 0)
        return <h4 className="text-center mt-5">No orders found.</h4>;

    return (
        <div className="container mt-4">
            <h3>My Orders</h3>
            <div className="mt-4">

                {orders.map((order) => (
                    <div
                        key={order.id}
                        className="card mb-3 shadow-sm p-3"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate(`/orders/${order.id}`)}
                    >
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h5>Order #{order.id}</h5>
                                <p className="text-muted">{new Date(order.createdAt).toLocaleString()}</p>

                                <span className={`badge bg-${order.status === "DELIVERED" ? "success" :
                                        order.status === "SHIPPED" ? "primary" :
                                            order.status === "CANCELLED" ? "danger" : "warning"
                                    }`}>
                                    {order.status}
                                </span>
                            </div>

                            <h5 className="text-success">₹{order.totalAmount}</h5>
                        </div>

                        <p className="mb-1">Items: <strong>{order.items.length}</strong></p>
                    </div>

                ))}

            </div>
        </div>
    );
}
