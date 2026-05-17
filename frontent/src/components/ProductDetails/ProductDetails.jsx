import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Spinner, Container, Row, Col, Card, Button } from "react-bootstrap";
import CommentSection from "../Comment/CommentSection";

const ProductDetails = () => {
  // const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          // `localhost:5000/api/v1/users/product/byId/6a095cdf8bb0615b83c9a000`,
          `http://localhost:5000/api/v1/users/product/byId/6a095cdf8bb0615b83c9a000`,
        );
        setProduct(response.data.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  if (loading) {
    return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  }

  if (!product) {
    return <h3 className="text-center mt-5">Product Not Found</h3>;
  }

  return (
    <Container className="mt-4">
      <Row>
        {/* Product Images */}
        <Col md={6}>
          <Card>
            <Card.Img variant="top" src={product.thumbnail} />
            <Card.Body>
              <Row>
                {product?.imageFiles?.map((img, index) => (
                  <Col key={index} xs={4} className="mb-2">
                    <img
                      src={img}
                      alt={`Product ${index}`}
                      className="img-thumbnail"
                    />
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>

        {/* Product Details */}
        <Col md={6}>
          <h2>{product.productName}</h2>
          <p className="text-muted">{product.brand}</p>
          <h4 className="text-danger">
            ${product.price}{" "}
            <del className="text-secondary">${product.oldPrice}</del>
          </h4>
          <p className="fw-bold">Stock: {product.stock} available</p>
          <p>{product.description}</p>
          <Button variant="primary" className="me-2">
            Buy Now
          </Button>
          <Button variant="outline-secondary">Add to Cart</Button>
        </Col>
      </Row>

      {/* Product Comments */}
      <Row className="mt-5">
        <Col>
          <h4>Customer Reviews</h4>
          {product?.comments?.length > 0 ? (
            product.comments.map((comment) => (
              <Card key={comment._id} className="mb-2">
                <Card.Body>
                  <p>{comment.commentText}</p>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </Col>
      </Row>
      {/* Comment Section */}
      {/* <CommentSection
        productId={"67abf6e7c0123aa2eb52585d"}
        userId={"67aacff891017d3cb391bec2"}
      /> */}
    </Container>
  );
};

export default ProductDetails;
