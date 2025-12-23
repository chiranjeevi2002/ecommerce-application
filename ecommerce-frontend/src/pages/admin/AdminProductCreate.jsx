import AdminSidebar from "../../components/layout/AdminSidebar";
import AdminHeader from "../../components/layout/AdminHeader";
import ProductForm from "../../components/forms/ProductForm";
import productAdminApi from "../../api/productAdminApi";
import { useNavigate } from "react-router-dom";

export default function AdminProductCreate() {
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    try {
      await productAdminApi.create(data);
      navigate("/admin/products");
    } catch (err) {
      console.error("Create failed", err);
      alert("Failed to create product");
    }
  };

  return (
    <div className="d-flex">
      <AdminSidebar />

      <div className="flex-grow-1">
        <AdminHeader />

        <div className="container mt-4">
          <h3>Add New Product</h3>
          <ProductForm
            onSubmit={handleCreate}
            buttonLabel="Create Product"
          />
        </div>
      </div>
    </div>
  );
}
