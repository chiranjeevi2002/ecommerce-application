import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const BASE_URL = "http://localhost:8080";

  const imageUrl = product.imageUrls?.[0]
    ? BASE_URL + product.imageUrls[0]
    : "/placeholder.png";


  // const imageUrl = product.imageUrls[0] || "/placeholder.png";
  return (
    <div className="col-6 col-md-4 col-lg-3 mb-4">
      <div className="card shadow-sm h-100" style={{ cursor: "pointer" }}>
        <img
          src={imageUrl}
          className="card-img-top"
          alt={product.name}
          style={{ height: "180px", objectFit: "cover" }}
          onClick={() => navigate(`/product/${product.id}`)}
        />


        <div className="card-body">
          <h6 className="card-title" onClick={() => navigate(`/product/${product.id}`)}>
            {product.name}
          </h6>

          <h5 className="text-primary"><i className="bi bi-currency-rupee"></i>{product.price}</h5>

          <button
            className="btn btn-sm btn-warning w-100 mt-2"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
