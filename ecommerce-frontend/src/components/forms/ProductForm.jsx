import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";

export default function ProductForm({ initialData = {}, onSubmit, buttonLabel }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    imageUrl: "",
    ...initialData,
  });

  const [categories, setCategories] = useState([]);

  // Preview image (existing or newly uploaded)
  const previewImage = form.imageUrl;

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await axiosClient.get("/productservice/categories");
      setCategories(res.data || []);
    } catch (err) {
      console.error("Failed to load categories", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4 shadow-sm">

      <div className="mb-3">
        <label className="form-label">Product Name</label>
        <input
          className="form-control"
          name="name"
          required
          value={form.name}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          name="description"
          rows={3}
          value={form.description}
          onChange={handleChange}
        ></textarea>
      </div>

      <div className="row">
        <div className="col-md-4 mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            name="price"
            required
            value={form.price}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-4 mb-3">
          <label className="form-label">Stock</label>
          <input
            type="number"
            className="form-control"
            name="stock"
            required
            value={form.stock}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-4 mb-3">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            name="categoryId"
            required
            value={form.categoryId}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Image Preview Section */}
      {previewImage && (
        <div className="mb-3">
          <label className="form-label">Image Preview</label>
          <div>
            <img
              src={previewImage}
              alt="preview"
              className="border rounded"
              style={{ height: "120px", objectFit: "contain" }}
            />
          </div>
        </div>
      )}

      <button className="btn btn-primary w-100 mt-3">{buttonLabel}</button>
    </form>
  );
}
