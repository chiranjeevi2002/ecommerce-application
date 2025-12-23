import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, updateQty } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = total > 499 ? 0 : 49;
  const grandTotal = total + delivery;

  if (cart.length === 0)
    return <h4 className="text-center mt-5">Your cart is empty</h4>;

  return (
    <div className="container mt-4">
      <h3>Your Cart</h3>
      <div className="row mt-3">

        <div className="col-md-8">

          {cart.map((item) => {
            const imageUrl = item.imageUrls?.[0]
              ? "http://localhost:8080" + item.imageUrls[0]
              : "/placeholder.png";

            return (
              <div className="card mb-3 shadow-sm" key={item.id}>
                <div className="card-body d-flex align-items-start">

                  <img
                    src={imageUrl}
                    alt={item.name}
                    style={{ width: "120px", height: "120px", objectFit: "contain" }}
                    className="me-3"
                  />

                  <div className="flex-grow-1">

                    <h6>{item.name}</h6>
                    <p className="text-muted">{item.categoryName}</p>

                    <h5 className="text-primary">
                      <i className="bi bi-currency-rupee"></i>
                      {item.price}
                    </h5>

                    <div className="d-flex align-items-center mt-2">

                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() =>
                          updateQty(item.id, Math.max(1, item.quantity - 1))
                        }
                      >
                        -
                      </button>

                      <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        className="form-control text-center mx-2"
                        style={{ width: "60px" }}
                        onChange={(e) =>
                          updateQty(item.id, Math.max(1, parseInt(e.target.value)))
                        }
                      />

                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => updateQty(item.id, item.quantity + 1)}
                      >
                        +
                      </button>

                      <button
                        className="btn btn-danger btn-sm ms-3"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>

                    <p className="mt-2">
                      Subtotal:{" "}
                      <strong>
                        <i className="bi bi-currency-rupee"></i>
                        {item.price * item.quantity}
                      </strong>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm p-3">
            <h5>Price Details</h5>
            <hr />

            <p className="d-flex justify-content-between">
              <span>Items:</span>
              <strong>{cart.length}</strong>
            </p>

            <p className="d-flex justify-content-between">
              <span>Total Price:</span>
              <strong>
                <i className="bi bi-currency-rupee"></i>
                {total}
              </strong>
            </p>

            <p className="d-flex justify-content-between">
              <span>Delivery Charge:</span>
              <strong className={delivery === 0 ? "text-success" : ""}>
                {delivery === 0 ? "Free" : "₹49"}
              </strong>
            </p>

            <hr />

            <p className="d-flex justify-content-between fs-5">
              <span>Grand Total:</span>
              <strong>
                <i className="bi bi-currency-rupee"></i>
                {grandTotal}
              </strong>
            </p>

            <button
              className="btn btn-success w-100 mt-3"
              onClick={() => (window.location.href = "/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
