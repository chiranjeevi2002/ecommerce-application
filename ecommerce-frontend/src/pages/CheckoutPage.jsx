import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import orderApi from "../api/orderApi";

export default function CheckoutPage() {
  const { cart, clearCart } = useContext(CartContext);

  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("ONLINE");
  const [error, setError] = useState("");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const placeOrder = async () => {
    if (!address.trim()) {
      setError("Please enter delivery address");
      return;
    }

    const items = cart.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
      price: item.price
    }));

    const orderData = {
      userId: sessionStorage.getItem("userId"),
      storeId: sessionStorage.getItem("storeId"),
      totalAmount: total,
      paymentMethod,
      address,
      items
    };

    try {
      const res = await orderApi.createOrder(orderData);
      clearCart();
      window.location.href = `/order-success/${res.data.id}`;
    } catch (err) {
      setError("Order failed. Try again.");
    }
  };

  if (cart.length === 0) {
    return <h4 className="text-center mt-5">Your cart is empty</h4>;
  }

  return (
    <div className="container mt-4">
      <h3>Checkout</h3>
      <div className="row mt-4">

        <div className="col-md-8">
          <div className="card p-3 shadow-sm">
            <h5>Delivery Address</h5>
            <textarea
              className="form-control"
              rows="3"
              placeholder="Enter full address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <h5 className="mt-4">Payment Method</h5>
            <select
              className="form-control"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="ONLINE">Online Payment</option>
              <option value="COD">Cash on Delivery</option>
            </select>

            {error && <div className="alert alert-danger mt-3">{error}</div>}
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm p-3">
            <h5>Order Summary</h5>
            <hr />
            <p>Total items: {cart.length}</p>
            <p className="fw-bold">Total Amount: ₹{total}</p>
            <button className="btn btn-success w-100 mt-3" onClick={placeOrder}>
              Place Order
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
