import React, { useState } from "react";
import axios from "axios";

const CategoryUpload = () => {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    description: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file)); // Show preview
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.title || !formData.description || !image) {
      alert("Please fill all fields and upload an image.");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("image", image); // Image file

    setLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/admin/category/create`,
        // "http://localhost:5000/api/v1/admin/category/create",
        data,
        // { headers: { "Content-Type": "multipart/form-data" } }
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      alert("Category uploaded successfully!");
      console.log(response.data);

      // Reset Form
      setFormData({ name: "", title: "", description: "" });
      setImage(null);
      setPreview(null);
    } catch (error) {
      console.error("Upload failed", error);
      alert("Failed to upload category.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Upload Category</h2>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="card p-4 shadow">
            <div className="mb-3">
              <label className="form-label">Category Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter category name"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter title"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter description"
                rows="3"
                required
              />
            </div>

            {/* Image Upload */}
            <div className="mb-3">
              <label className="form-label">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="form-control"
                required
              />
            </div>

            {/* Image Preview */}
            {preview && (
              <div className="text-center mb-3">
                <img
                  src={preview}
                  alt="Preview"
                  className="img-thumbnail"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Uploading..." : "Upload Category"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CategoryUpload;
