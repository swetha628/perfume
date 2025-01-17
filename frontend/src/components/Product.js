import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, Button, Row, Col, Container } from 'react-bootstrap';

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products')
      .then(response => {
        console.log('Products fetched:', response.data);
        setProducts(response.data);  // Set the fetched data
      })
      .catch(error => {
        if (error.response) {
          console.error('Error response:', error.response);
        } else if (error.request) {
          console.error('Error request:', error.request);
        } else {
          console.error('Error message:', error.message);
        }
      });
  }, []);
  
  return (
    <Container>
      <h2>Our Products</h2>
      <Row>
        {products.map((product) => (
          <Col key={product._id} md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={product.imageUrl} alt={product.name} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>${product.price}</Card.Text>
                <Button as={Link} to={`/products/${product._id}`} variant="primary">
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Product;
