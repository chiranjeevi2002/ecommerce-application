import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import productApi from "../api/productApi";
import { CartContext } from "../context/CartContext";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();


  useEffect(() => {
    loadProduct();
  }, []);

  const handleBuyNow = () => {
    addToCart(product);
    navigate("/checkout");
  };


  const loadProduct = async () => {
    try {
      const res = await productApi.getById(id);
      setProduct(res.data);
    } catch (err) {
      console.error("Failed to load product", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (!product) return <div className="text-center mt-5">Product not found</div>;

  const images = product.imageUrls || [];

  return (
    <div className="container mt-4">
      <div className="row">


        <div className="col-md-5 text-center">

          {images.length > 0 ? (
            <div id="productCarousel" className="carousel slide" data-bs-ride="carousel">

              <div className="carousel-inner">
                {images.map((img, index) => {
                  const BASE_URL = "http://localhost:8080";
                  const fullImageUrl = BASE_URL + img;
                  return (<div
                    key={index}
                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                  >
                    <img
                      src={fullImageUrl}
                      className="d-block w-100 rounded shadow"
                      alt={product.name}
                      style={{ maxHeight: "400px", objectFit: "contain" }}
                    />
                  </div>);
                })}
              </div>


              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#productCarousel"
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon"></span>
              </button>


              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#productCarousel"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon"></span>
              </button>

            </div>
          ) : (

            <img
              src="/placeholder.png"
              alt="No image"
              className="img-fluid rounded shadow"
              style={{ maxHeight: "400px", objectFit: "contain" }}
            />

          )}
        </div>


        <div className="col-md-7">
          <h2>{product.name}</h2>
          <p className="text-muted">{product.categoryName}</p>

          <h3 className="text-primary">
            <i className="bi bi-currency-rupee"></i>
            {product.price}
          </h3>

          <p className="mt-3">{product.description}</p>

          <button
            className="btn btn-warning btn-lg mt-3 w-100"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>

          <button className="btn btn-outline-primary btn-lg mt-3 w-100" onClick={handleBuyNow}>
            Buy Now
          </button>
        </div>
      </div>


      <div className="mt-5">
        <h4>Product Details</h4>
        <hr />
        <p>{product.longDescription || "No additional details available."}</p>
      </div>
    </div>
  );
}
