// src/pages/admin/AdminInventory.jsx
import { useEffect, useState } from "react";
import AdminSidebar from "../../components/layout/AdminSidebar";
import AdminHeader from "../../components/layout/AdminHeader";
import adminProductApi from "../../api/adminProductApi";

export default function AdminInventory() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [stockValue, setStockValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    setLoading(true);
    try {
      const res = await adminProductApi.getAll();
      setProducts(res.data.content || []);
    } catch (err) {
      console.error("Failed to load inventory", err);
    } finally {
      setLoading(false);
    }
  };

  const startEditing = (id, currentStock) => {
    setEditingId(id);
    setStockValue(currentStock);
  };

  const saveStock = async (id) => {
    try {
      await adminProductApi.updateStock(id, Number(stockValue));
      setMessage("Stock updated successfully!");

      setEditingId(null);
      loadInventory();

      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      console.error("Stock update failed", err);
      setMessage("Update failed!");
      setTimeout(() => setMessage(""), 2000);
    }
  };

  return (
    <div className="d-flex">
      <AdminSidebar />

      <div className="flex-grow-1">
        <AdminHeader />

        <div className="container mt-4">
          <h3>Inventory Management</h3>

          {message && (
            <div className="alert alert-info mt-3">{message}</div>
          )}

          <table className="table table-bordered table-striped mt-4">
            <thead className="table-dark">
              <tr>
                <th style={{ width: "35%" }}>Product</th>
                <th style={{ width: "15%" }}>Category</th>
                <th style={{ width: "15%" }}>Price (₹)</th>
                <th style={{ width: "15%" }}>Stock</th>
                <th style={{ width: "20%" }}>Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    Loading...
                  </td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr key={p.id}>
                    <td>{p.name}</td>
                    <td>{p.categoryName}</td>
                    <td>{p.price}</td>

                    {/* Editable Stock Field */}
                    <td>
                      {editingId === p.id ? (
                        <input
                          type="number"
                          className="form-control"
                          value={stockValue}
                          onChange={(e) => setStockValue(e.target.value)}
                        />
                      ) : (
                        p.stock
                      )}
                    </td>

                    <td>
                      {editingId === p.id ? (
                        <>
                          <button
                            className="btn btn-success btn-sm me-2"
                            onClick={() => saveStock(p.id)}
                          >
                            Save
                          </button>

                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => setEditingId(null)}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => startEditing(p.id, p.stock)}
                        >
                          Edit Stock
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
