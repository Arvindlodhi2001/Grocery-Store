import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

// Sample Wishlist Data (Replace with API Data)
const wishlistItems = [
  {
    _id: "1",
    productName: "Wireless Headphones",
    price: 99.99,
    oldPrice: 129.99,
    rating: 4.5,
    thumbnail: "https://via.placeholder.com/150",
  },
  {
    _id: "2",
    productName: "Smartwatch Series 5",
    price: 199.99,
    oldPrice: 249.99,
    rating: 4.8,
    thumbnail: "https://via.placeholder.com/150",
  },
];

const Wishlist = () => {
  const handleRemove = (id) => {
    alert(`Remove item with ID: ${id}`);
  };

  const handleAddToCart = (id) => {
    alert(`Added item with ID: ${id} to cart`);
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">My Wishlist</h2>
      <Row>
        {wishlistItems.map((item) => (
          <Col md={4} key={item._id} className="mb-4">
            <Card className="shadow-sm">
              <Card.Img
                variant="top"
                src={item.thumbnail}
                alt={item.productName}
              />
              <Card.Body>
                <Card.Title>{item.productName}</Card.Title>
                <p className="text-muted">
                  <del>${item.oldPrice.toFixed(2)}</del>{" "}
                  <span className="text-success">${item.price.toFixed(2)}</span>
                </p>
                <p>⭐ {item.rating} / 5</p>
                <div className="d-flex justify-content-between">
                  <Button
                    variant="danger"
                    onClick={() => handleRemove(item._id)}
                  >
                    Remove
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => handleAddToCart(item._id)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Wishlist;
