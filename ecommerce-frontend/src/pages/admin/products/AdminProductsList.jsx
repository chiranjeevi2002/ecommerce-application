import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "../../../components/layout/AdminSidebar";
import AdminHeader from "../../../components/layout/AdminHeader";
import adminProductApi from "../../../api/adminProductApi";
import AdminTableSkeleton from "../../../components/ui/AdminTableSkeleton";

export default function AdminProductsList() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(12);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const [sortBy, setSortBy] = useState("createdAt");
  const [direction, setDirection] = useState("DESC");

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line
  }, [page, size, search, sortBy, direction]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await adminProductApi.getAll(page, size, search, sortBy, direction);
      const data = res.data;

      setProducts(data.content ?? []);
      setTotalPages(data.totalPages ?? 0);
      setTotalElements(data.totalElements ?? 0);
    } catch (err) {
      console.error("Failed to load products", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const applySearch = () => {
    setPage(0);
    setSearch(searchInput.trim());
  };

  const resetSearch = () => {
    setSearchInput("");
    setSearch("");
    setPage(0);
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete product "${name}"?`)) return;

    try {
      await AdminProductApi.delete(id);
      loadProducts();
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete product");
    }
  };

  const goToPage = (p) => {
    if (p < 0 || p >= totalPages) return;
    setPage(p);
  };

  const formatDateTime = (iso) =>
    iso
      ? new Date(iso).toLocaleString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      : "—";

  return (
    <div className="d-flex">
      <AdminSidebar />

      <div className="flex-grow-1">
        <AdminHeader />

        <div className="container mt-4 mb-5">
          {/* HEADER */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h3 className="mb-0">Products</h3>
              <small className="text-muted">
                Total: {totalElements} item{totalElements !== 1 ? "s" : ""}
              </small>
            </div>

            <div className="d-flex gap-2">
              {/* SEARCH */}
              <div className="input-group" style={{ maxWidth: 320 }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by name or category..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && applySearch()}
                />

                <button className="btn btn-outline-secondary" onClick={applySearch}>
                  Search
                </button>

                {search && (
                  <button className="btn btn-outline-danger" onClick={resetSearch}>
                    Clear
                  </button>
                )}
              </div>

              {/* ADD BUTTON */}
              <Link className="btn btn-success" to="/admin/products/new">
                + Add Product
              </Link>
            </div>
          </div>

          {/* SORT FILTERS */}
          <div className="d-flex gap-2 mb-3">
            <select
              className="form-select"
              style={{ maxWidth: 200 }}
              value={sortBy}
              onChange={(e) => { setSortBy(e.target.value); setPage(0); }}
            >
              <option value="createdAt">Newest</option>
              <option value="name">Name</option>
              <option value="price">Price</option>
              <option value="quantity">Stock</option>
            </select>

            <select
              className="form-select"
              style={{ maxWidth: 160 }}
              value={direction}
              onChange={(e) => { setDirection(e.target.value); setPage(0); }}
            >
              <option value="DESC">Descending</option>
              <option value="ASC">Ascending</option>
            </select>
          </div>

          {/* TABLE */}
          <div className="card shadow-sm">
            <div className="card-body">
              {loading ? (
                <AdminTableSkeleton rows={6} />
              ) : products.length === 0 ? (
                <p className="text-center mb-0">No products found.</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-striped table-hover mb-0">
                    <thead className="table-dark">
                      <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price (₹)</th>
                        <th>Stock</th>
                        <th>Created At</th>
                        <th className="text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((p) => (
                        <tr key={p.id}>
                          <td>{p.name}</td>
                          <td>{p.categoryName}</td>
                          <td>{p.price}</td>
                          <td>{p.quantity}</td>
                          <td>{formatDateTime(p.createdAt)}</td>
                          <td className="text-end">
                            <Link
                              className="btn btn-sm btn-outline-primary me-2"
                              to={`/admin/products/${p.id}/edit`}
                            >
                              Edit
                            </Link>

                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(p.id, p.name)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* PAGINATION */}
            {!loading && totalPages > 1 && (
              <div className="card-footer d-flex justify-content-between">
                <div>
                  Page {page + 1} of {totalPages}
                </div>

                <div className="btn-group">
                  <button className="btn btn-sm btn-outline-secondary" disabled={page === 0}
                    onClick={() => goToPage(0)}>
                    « First
                  </button>
                  <button className="btn btn-sm btn-outline-secondary" disabled={page === 0}
                    onClick={() => goToPage(page - 1)}>
                    ‹ Prev
                  </button>

                  <button className="btn btn-sm btn-outline-secondary"
                    disabled={page >= totalPages - 1}
                    onClick={() => goToPage(page + 1)}>
                    Next ›
                  </button>
                  <button className="btn btn-sm btn-outline-secondary"
                    disabled={page >= totalPages - 1}
                    onClick={() => goToPage(totalPages - 1)}>
                    Last »
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
