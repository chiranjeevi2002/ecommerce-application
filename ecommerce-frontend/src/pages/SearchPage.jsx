import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import productApi from "../api/productApi";
import ProductCard from "../components/ProductCard";

export default function SearchPage() {
  const [params] = useSearchParams();
  const query = params.get("query") || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) performSearch();
  }, [query]);

  const performSearch = async () => {
    try {
      const res = await productApi.search(query);
      setProducts(res.data.content || []);
    } catch (err) {
      console.error("Search failed", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center mt-5">Searching...</div>;

  return (
    <div className="container mt-4">
      <h4>
        Search results for: <strong>{query}</strong>
      </h4>
      <hr />

      {products.length === 0 ? (
        <h5>No results found</h5>
      ) : (
        <div className="row mt-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
