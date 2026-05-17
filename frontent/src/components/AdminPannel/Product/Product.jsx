import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Product = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    productName: "Samsung Galaxy S23",
    category: ["67bb6ca97fc255d2d4b7cdc2", "67bb6a2bd2f4da92aabe4d6d"],
    brand: "Samsung",
    price: "799.99",
    oldPrice: "999.99",
    stock: "50",
    imageFiles: [],
    description:
      "The latest Samsung Galaxy S23 with 128GB storage and advanced camera features.",
    condition: "New",
    color: ["Black", "Silver"],
    tag: "Best Seller",
    title: "Samsung Galaxy S23 - 128GB",
    rating: "4.8",
    quantity: ["1", "2", "3", "4"],
  });

  useEffect(() => {
    console.log("formData-->", formData);
  }, [formData]);

  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState("");

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/product/all`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`${API_URL}/product/delete/${id}`);
        alert("Product deleted successfully!");

        setProducts(products.filter((product) => product._id !== id)); // Update state
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  //     Upload Product

  const submit = async () => {
    try {
      const formDataToSend = new FormData();

      // Append all form data fields
      Object.keys(formData).forEach((key) => {
        if (key === "imageFiles") {
          // Append each image file separately
          formData.imageFiles.forEach((file) => {
            formDataToSend.append("imageFiles", file);
          });
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      console.log("formDataToSend", formDataToSend);

      await axios.post(
        `${API_URL}/api/v1/admin/product/upload`,
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      alert("Product uploaded successfully!");
      fetchProducts();
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle multi-select additions
  const handleAddCategory = () => {
    if (selectedCategory && !formData.category.includes(selectedCategory)) {
      setFormData({
        ...formData,
        category: [...formData.category, selectedCategory],
      });
      setSelectedCategory("");
    }
  };

  const handleAddColor = () => {
    if (selectedColor && !formData.color.includes(selectedColor)) {
      setFormData({ ...formData, color: [...formData.color, selectedColor] });
      setSelectedColor("");
    }
  };

  const handleAddQuantity = () => {
    if (selectedQuantity && !formData.quantity.includes(selectedQuantity)) {
      setFormData({
        ...formData,
        quantity: [...formData.quantity, selectedQuantity],
      });
      setSelectedQuantity("");
    }
  };

  // Handle image selection
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages([...selectedImages, ...files]);

    setFormData({
      ...formData,
      imageFiles: [...formData.imageFiles, ...files], // Store actual file objects
    });
  };

  // Remove selected items
  const handleRemoveCategory = (cat) => {
    setFormData({
      ...formData,
      category: formData.category.filter((c) => c !== cat),
    });
  };

  const handleRemoveColor = (color) => {
    setFormData({
      ...formData,
      color: formData.color.filter((c) => c !== color),
    });
  };

  const handleRemoveQuantity = (qty) => {
    setFormData({
      ...formData,
      quantity: formData.quantity.filter((q) => q !== qty),
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageFiles: formData.imageFiles.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Manage Product</h2>
      <div className="card p-4 mb-4">
        <form>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label>Product Name</label>
              <input
                type="text"
                name="productName"
                className="form-control"
                value={formData.productName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label>Brand</label>
              <input
                type="text"
                name="brand"
                className="form-control"
                value={formData.brand}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label>price</label>
              <input
                type="text"
                name="price"
                className="form-control"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label>Old Price</label>
              <input
                type="text"
                name="oldPrice"
                className="form-control"
                value={formData.oldPrice}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label>How many items in stock</label>
              <input
                type="text"
                name="stock"
                className="form-control"
                value={formData.stock}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label>Tag</label>
              <input
                type="text"
                name="tag"
                className="form-control"
                value={formData.tag}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label>Rating</label>
              <input
                type="text"
                name="rating"
                className="form-control"
                value={formData.rating}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label>condition</label>
              <div>
                <select
                  type="text"
                  name="condition"
                  className="form-control"
                  value={formData.condition}
                  onChange={handleChange}
                  required
                >
                  <option value="New">New</option>
                  <option value="Refurbished">Refurbished</option>
                  <option value="Used">Used</option>
                </select>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <label>Category</label>
              <input
                type="text"
                className="form-control"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-primary mt-2"
                onClick={handleAddCategory}
              >
                Add Category
              </button>
              <div className="mt-2">
                {formData.category.map((cat, index) => (
                  <span key={index} className="badge bg-secondary me-2">
                    {cat}{" "}
                    <button
                      type="button"
                      className="btn-close btn-close-white ms-1"
                      onClick={() => handleRemoveCategory(cat)}
                    ></button>
                  </span>
                ))}
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <label>Product Images</label>
              <input
                type="file"
                name="imageFiles"
                multiple
                className="form-control"
                onChange={handleImageUpload}
              />
              <div className="mt-2">
                {formData.imageFiles.map((img, index) => (
                  <div key={index} className="d-inline-block me-2">
                    <img
                      src={img}
                      alt="Preview"
                      className="img-thumbnail"
                      style={{ width: "80px", height: "80px" }}
                    />
                    <button
                      type="button"
                      className="btn btn-danger btn-sm d-block mt-1"
                      onClick={() => handleRemoveImage(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <label>Colors</label>
              <input
                type="text"
                className="form-control"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-primary mt-2"
                onClick={handleAddColor}
              >
                Add Color
              </button>
              <div className="mt-2">
                {formData.color.map((col, index) => (
                  <span key={index} className="badge bg-secondary me-2">
                    {col}{" "}
                    <button
                      type="button"
                      className="btn-close btn-close-white ms-1"
                      onClick={() => handleRemoveColor(col)}
                    ></button>
                  </span>
                ))}
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <label>Quantity</label>
              <input
                type="text"
                className="form-control"
                value={selectedQuantity}
                onChange={(e) => setSelectedQuantity(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-primary mt-2"
                onClick={handleAddQuantity}
              >
                Add Quantity
              </button>
              <div className="mt-2">
                {formData.quantity.map((qua, index) => (
                  <span key={index} className="badge bg-secondary me-2">
                    {qua}{" "}
                    <button
                      type="button"
                      className="btn-close btn-close-white ms-1"
                      onClick={() => handleRemoveQuantity(qua)}
                    ></button>
                  </span>
                ))}
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <label>Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-12 mb-3">
              <label>Description</label>
              <div>
                <textarea
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="form-control"
                  required
                ></textarea>
              </div>
            </div>
            <div>
              <button
                className="btn btn-primary mt-2"
                type="button" // Prevents default form submission behavior
                onClick={submit}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Show All product in a table formate */}
      {/* Product Table */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Old Price</th>
            <th>Color</th>
            <th>Tag</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.productName}</td>
              <td>{product.category.join(", ")}</td>
              <td>{product.brand}</td>
              <td>{product.price}</td>
              <td>{product.oldPrice}</td>
              <td>{product.color.join(", ")}</td>
              <td>{product.tag}</td>
              <td>{product.rating}</td>
              <td>
                <button className="btn btn-info btn-sm me-2">View</button>
                <button className="btn btn-warning btn-sm me-2">Edit</button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Product;
