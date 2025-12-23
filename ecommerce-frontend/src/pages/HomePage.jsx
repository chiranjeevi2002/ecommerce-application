import { useEffect, useState } from "react";
import productApi from "../api/productApi";
import ProductCard from "../components/ProductCard";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [page, setPage] = useState(0);
  const [size] = useState(12);

  const [totalPages, setTotalPages] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, [page]);

  const loadProducts = async () => {
    try {
      const res = await productApi.getAll(page, size);
      const pageData = res.data;

      setProducts(pageData.content || []);
      setFilteredProducts(pageData.content || []);
      setTotalPages(pageData.totalPages || 1);

      const uniqueCategories = [
        ...new Set(pageData.content.map((p) => p.categoryName)),
      ];
      setCategories(uniqueCategories);
    } catch (err) {
      console.error("Failed to load products", err);
    }
  };

  const filterByCategory = (c) => {
    if (c === "ALL") setFilteredProducts(products);
    else setFilteredProducts(products.filter((p) => p.categoryName === c));
  };

  return (
    <div className="container-fluid mt-4">
      <div className="row">


        <div className="col-12 col-md-3 col-lg-2 mb-4">
          <div className="list-group shadow-sm">
            <button
              className="list-group-item list-group-item-action"
              onClick={() => filterByCategory("ALL")}
            >
              All Products
            </button>

            {categories.map((c, index) => (
              <button
                key={index}
                className="list-group-item list-group-item-action"
                onClick={() => filterByCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>


        <div className="col-12 col-md-9 col-lg-10">

          <div className="row">
            {filteredProducts.length === 0 ? (
              <p>No products found.</p>
            ) : (
              filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))
            )}
          </div>


          <nav className="mt-4">
            <ul className="pagination justify-content-center">


              <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setPage(page - 1)}>
                  Previous
                </button>
              </li>


              {Array.from({ length: totalPages }, (_, i) => (
                <li
                  key={i}
                  className={`page-item ${i === page ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => setPage(i)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}


              <li
                className={`page-item ${page === totalPages - 1 ? "disabled" : ""
                  }`}
              >
                <button className="page-link" onClick={() => setPage(page + 1)}>
                  Next
                </button>
              </li>

            </ul>
          </nav>

        </div>
      </div>
    </div>
  );
}
