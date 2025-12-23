// src/pages/admin/products/AdminProductEdit.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminSidebar from "../../../components/layout/AdminSidebar";
import AdminHeader from "../../../components/layout/AdminHeader";
import adminProductApi from "../../../api/adminProductApi";
import AdminProductForm from "./AdminProductForm";

export default function AdminProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    try {
      const res = await adminProductApi.getById(id);
      setProduct(res.data || res);
    } catch (err) {
      console.error("Failed to load product", err);
    }
  };

  const handleSubmit = async (data) => {
    try {
      await adminProductApi.update(id, data);
      navigate("/admin/products");
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="d-flex">
      <AdminSidebar />

      <div className="flex-grow-1">
        <AdminHeader />

        <div className="container mt-4">
          <h3>Edit Product</h3>
          <AdminProductForm initialData={product} onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
