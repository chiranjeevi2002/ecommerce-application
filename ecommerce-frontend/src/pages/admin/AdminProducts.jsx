import { useEffect, useState } from "react";
import productAdminApi from "../../api/productAdminApi";
import AdminSidebar from "../../components/layout/AdminSidebar";
import AdminHeader from "../../components/layout/AdminHeader";
import { Link } from "react-router-dom";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await productAdminApi.getAll();
      setProducts(res.data.content || []);
    } catch (err) {
      console.error("Load failed", err);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete product?")) return;
    await productAdminApi.delete(id);
    load();
  };

  return (
    <div className="d-flex">
      <AdminSidebar />

      <div className="flex-grow-1">
        <AdminHeader />

        <div className="container mt-4">
          <div className="d-flex justify-content-between mb-3">
            <h3>Products</h3>
            <Link className="btn btn-success" to="/admin/products/new">
              Add Product
            </Link>
          </div>

          <table className="table table-hover shadow-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>₹{p.price}</td>
                  <td>{p.categoryName}</td>
                  <td className="text-end">
                    <Link
                      className="btn btn-primary btn-sm me-2"
                      to={`/admin/products/${p.id}/edit`}
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => remove(p.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
}
