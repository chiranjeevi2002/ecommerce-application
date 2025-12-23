import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/layout/AdminSidebar";
import AdminHeader from "../../components/layout/AdminHeader";
import AdminProductApi from "../../api/adminProductApi";
import ProductForm from "../../components/forms/ProductForm";

export default function AdminProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [initialData, setInitialData] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    try {
      const res = await AdminProductApi.getById(id);
      const product = res.data;
      setInitialData(product);
      setExistingImages(product.imageUrls || []);
    } catch (err) {
      console.error("Failed to load product", err);
    }
  };

  const handleFileChange = (e) => {
    const files = [...e.target.files];
    setImageFiles(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(previews);
  };

  const removeExistingImage = (index) => {
    const updated = existingImages.filter((_, i) => i !== index);
    setExistingImages(updated); // Soft delete
  };

  const handleUpdate = async (data) => {
    try {
      let finalImages = [...existingImages];

      if (imageFiles.length > 0) {
        const uploadRes = await AdminProductApi.uploadImages(imageFiles);
        const newUrls = uploadRes.data;
        finalImages = [...finalImages, ...newUrls];
      }

      const payload = {
        ...data,
        imageUrls: finalImages,
      };

      await AdminProductApi.update(id, payload);
      navigate("/admin/products");
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update product");
    }
  };

  if (!initialData)
    return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="d-flex">
      <AdminSidebar />
      <div className="flex-grow-1">
        <AdminHeader />

        <div className="container mt-4 mb-5">
          <h3>Edit Product</h3>

          {/* Existing Images */}
          {existingImages.length > 0 && (
            <div className="mb-3">
              <label className="form-label">Existing Images</label>
              <div className="d-flex flex-wrap gap-3">
                {existingImages.map((url, index) => (
                  <div
                    key={index}
                    className="position-relative"
                    style={{ width: "100px" }}
                  >
                    <img
                      src={url}
                      alt="product"
                      className="border rounded"
                      style={{ width: "100px", height: "100px", objectFit: "cover" }}
                    />
                    <button
                      className="btn btn-sm btn-danger position-absolute top-0 end-0"
                      onClick={() => removeExistingImage(index)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* New Upload */}
          <div className="mb-3">
            <label className="form-label">Upload New Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              className="form-control"
              onChange={handleFileChange}
            />
            {previewUrls.length > 0 && (
              <div className="mt-3 d-flex gap-2 flex-wrap">
                {previewUrls.map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt="preview"
                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                    className="border rounded"
                  />
                ))}
              </div>
            )}
          </div>

          <ProductForm
            initialData={initialData}
            onSubmit={handleUpdate}
            buttonLabel="Save Changes"
          />
        </div>
      </div>
    </div>
  );
}
