import { useState } from "react";
import AdminProductApi from "../../../api/adminProductApi";
import AdminSidebar from "../../../components/layout/AdminSidebar";
import AdminHeader from "../../../components/layout/AdminHeader";

export default function AdminProductNew() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    categoryId: "",
    imageUrl: ""
  });

  const [imageFiles, setImageFiles] = useState([]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    setImageFiles([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = null;
      if (imageFiles.length > 0) {
        const uploadRes = await AdminProductApi.uploadImages(imageFiles);
        imageUrl = uploadRes.data[0]; // take first file
      }

      const payload = { ...form, imageUrl };

      await AdminProductApi.create(payload);
      alert("Product created successfully");
      window.location.href = "/admin/products";

    } catch (err) {
      console.error("Create product failed", err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="d-flex">
      <AdminSidebar />

      <div className="flex-grow-1">
        <AdminHeader />

        <div className="container mt-4">
          <h3>Create Product</h3>

          <form onSubmit={handleSubmit} className="card p-4 shadow-sm">

            <div className="mb-3">
              <label className="form-label">Product Name</label>
              <input name="name" className="form-control" required
                     value={form.name} onChange={handleChange} />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea name="description" className="form-control"
                        value={form.description} onChange={handleChange} />
            </div>

            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Price</label>
                <input type="number" name="price" className="form-control"
                       required value={form.price} onChange={handleChange} />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Quantity</label>
                <input type="number" name="quantity" className="form-control"
                       required value={form.quantity} onChange={handleChange} />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Category</label>
                <select name="categoryId" className="form-select" required
                        value={form.categoryId} onChange={handleChange}>
                  <option value="">Select Category</option>
                  {/* TODO: load categories dynamically */}
                  <option value="1">Category 1</option>
                </select>
              </div>
            </div>

            {/* Image Upload */}
            <div className="mb-3">
              <label className="form-label">Product Image</label>
              <input type="file" className="form-control"
                     accept="image/*"
                     onChange={handleFileChange} />
            </div>

            <button className="btn btn-primary w-100">Create Product</button>
          </form>
        </div>
      </div>
    </div>
  );
}
