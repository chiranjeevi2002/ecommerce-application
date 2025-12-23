import { useParams } from "react-router-dom";

export default function OrderSuccessPage() {
  const { orderId } = useParams();

  return (
    <div className="container text-center mt-5">
      <h2>Order Placed Successfully!</h2>
      <p>Your order ID: <strong>{orderId}</strong></p>

      <button
        className="btn btn-primary mt-3"
        onClick={() => (window.location.href = "/")}
      >
        Go to Home
      </button>
    </div>
  );
}
