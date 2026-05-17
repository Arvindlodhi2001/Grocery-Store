import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import Toastify from "../../Utils/Toastify/Toastify";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductPage = () => {
  const { ProductID } = useParams();
  const [product, setProduct] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchProductDetail = async () => {
    console.log(`${API_URL}/product/byId/${ProductID}`);
    try {
      const response = await axios.get(`${API_URL}/product/byId/${ProductID}`);
      setProduct(response.data.data);
      console.log("Product Fetched Successfully:", response.data.data);
      await Toastify("success", "Product Fetch Successful");
    } catch (error) {
      console.log("Error fetching product:", error);
    }
  };

  useEffect(() => {
    fetchProductDetail();
  }, []); // ✅ Added dependency

  if (!product) return <p>Loading...</p>; // ✅ Prevents accessing undefined properties

  return (
    <Container className="mt-4">
      <ToastContainer />
      <p>
        <strong>Brand:</strong> {product.brand}
      </p>
      <h2>{product.title}</h2>

      <div className="mb-3">
        <Button variant="outline-primary" className="me-2">
          General info
        </Button>
        <Button variant="outline-secondary">Product details</Button>
      </div>

      <Row>
        {/* ✅ Check if `product.imageFiles` exists */}
        <Col md={6}>
          <img
            src={product.thumbnail}
            alt={product.productName}
            className="img-fluid"
            style={{ width: "250px", height: "250px" }}
          />
          <div className="d-flex mt-2">
            {product.imageFiles.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="Thumbnail"
                className="img-thumbnail me-2"
                style={{ width: "80px", height: "80px" }}
              />
            ))}
          </div>
        </Col>

        <Col md={6}>
          <h4 className="text-danger">
            ${product.price}{" "}
            <del className="text-muted">${product.oldPrice}</del>{" "}
            <span className="badge bg-danger">-50%</span>
          </h4>
          <p>⭐⭐⭐⭐☆ ({product.rating} rating)</p>
          <p>
            <strong>Stock:</strong> {product.stock} available
          </p>
          <p>
            <strong>Category:</strong> {product.category.join(", ")}
          </p>
          <p>
            <strong>Color:</strong> {product.color.join(", ")}
          </p>

          <Button variant="primary">Add to Cart</Button>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={6}>
          <h5>Delivery</h5>
          <ul>
            <li>Standard delivery: 1-4 business days ($4.50)</li>
            <li>Express delivery: 1 business day ($10.00)</li>
            <li>Pick up in store: Free</li>
          </ul>
        </Col>
        <Col md={6}>
          <h5>Return</h5>
          <p>You have 60 days to return the item.</p>
          <ul>
            <li>Free store return</li>
            <li>Free returns via USPS Drop-off</li>
          </ul>
        </Col>
      </Row>

      <Row className="mt-5 bg-light p-4">
        <Col>
          <h3>Subscribe for updates</h3>
          <p>Get exclusive sale access and new arrivals.</p>
          <div className="mb-3">
            <Button variant="outline-dark" className="me-2">
              Women
            </Button>
            <Button variant="outline-dark" className="me-2">
              Men
            </Button>
            <Button variant="outline-dark" className="me-2">
              Girls
            </Button>
            <Button variant="outline-dark">Boys</Button>
          </div>
          <Form>
            <Row>
              <Col md={4}>
                <Form.Control
                  type="email"
                  className="mt-4"
                  placeholder="Your email"
                />
              </Col>
              <Col>
                <Button variant="primary">Subscribe</Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductPage;
