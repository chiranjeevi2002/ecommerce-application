// src/pages/admin/products/AdminProductForm.jsx
import { useEffect, useState } from "react";
import adminProductApi from "../../../api/adminProductApi";

export default function AdminProductForm({ initialData, onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    images: [],
  });

  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    loadCategories();

    if (initialData) {
      setForm(initialData);
      setPreviewImages(initialData.images || []);
    }
  }, [initialData]);

  const loadCategories = async () => {
    try {
      const res = await adminProductApi.getCategories();
      setCategories(res.data || []);
    } catch (err) {
      console.error("Failed to load categories", err);
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const addNewCategory = async () => {
    if (!newCategory.trim()) return;

    try {
      const res = await adminProductApi.createCategory(newCategory.trim());
      setCategories((prev) => [...prev, res.data]);
      setForm({ ...form, category: res.data.name });
      setNewCategory("");
    } catch (err) {
      console.error("Failed to create category", err);
    }
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Step 1 — upload images first
    let uploadedUrls = form.images || [];
    if (imageFiles.length > 0) {
      try {
        const uploadRes = await adminProductApi.uploadImages(imageFiles);
        uploadedUrls = uploadRes.data.urls || [];
      } catch (err) {
        console.error("Image upload failed", err);
      }
    }

    // Step 2 — call onSubmit with final product data
    onSubmit({
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      images: uploadedUrls,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      
      {/* NAME */}
      <div className="mb-3">
        <label className="form-label fw-bold">Product Name</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>

      {/* DESCRIPTION */}
      <div className="mb-3">
        <label className="form-label fw-bold">Description</label>
        <textarea
          className="form-control"
          rows="3"
          name="description"
          value={form.description}
          onChange={handleChange}
          required
        ></textarea>
      </div>

      {/* CATEGORY SELECTOR */}
      <div className="mb-3">
        <label className="form-label fw-bold">Category</label>
        <div className="input-group">

          <select
            className="form-select"
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c.id || c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>

        </div>

        {/* ADD NEW CATEGORY */}
        <div className="input-group mt-2">
          <input
            type="text"
            className="form-control"
            placeholder="Add new category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={addNewCategory}
          >
            Add
          </button>
        </div>
      </div>

      {/* PRICE */}
      <div className="mb-3">
        <label className="form-label fw-bold">Price (₹)</label>
        <input
          type="number"
          className="form-control"
          name="price"
          value={form.price}
          onChange={handleChange}
          required
        />
      </div>

      {/* STOCK */}
      <div className="mb-3">
        <label className="form-label fw-bold">Stock</label>
        <input
          type="number"
          className="form-control"
          name="stock"
          value={form.stock}
          onChange={handleChange}
          required
        />
      </div>

      {/* IMAGES UPLOAD */}
      <div className="mb-3">
        <label className="form-label fw-bold">Product Images</label>

        <input
          type="file"
          className="form-control"
          multiple
          accept="image/*"
          onChange={handleImages}
        />

        {/* PREVIEW */}
        <div className="d-flex flex-wrap gap-2 mt-2">
          {previewImages.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="preview"
              style={{
                width: "90px",
                height: "90px",
                objectFit: "cover",
                borderRadius: "5px",
              }}
            />
          ))}
        </div>
      </div>

      <button className="btn btn-success w-100 mt-3">Save Product</button>
    </form>
  );
}
