import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import ReviewsSection from '../components/ReviewsSection';
import ImageGallery from '../components/ImageGallery';
import './ProductPage.css';
import { Facebook, Twitter, Instagram } from 'react-bootstrap-icons';

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(response => {
        setProduct(response.data);
        if (response.data.availableSizes.length > 0) {
          setSelectedSize(response.data.availableSizes[0]);
        }
      })
      .catch(error => console.error('Error fetching product:', error));
  }, [id]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  if (!product) return <div>Loading...</div>;

  const handleAddToCart = () => {
    const existingItem = cart.find(item => item.id === product._id && item.size === selectedSize);

    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product._id && item.size === selectedSize
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { id: product._id, name: product.name, price: product.price, image: product.images[0], size: selectedSize, quantity: 1 }]);
    }
  };

  return (
    <Container className="product-page my-5">
      <Row>
        <Col md={6}>
          <ImageGallery images={product.images} />
        </Col>
        <Col md={6}>
          <h2 className="product-title">{product.name}</h2>
          <p className="product-description">{product.fullDescription}</p>
          <h4 className="product-price">${product.price.toFixed(2)}</h4>
          <Form.Group className="mb-3">
            <Form.Label className="size-label">Available Sizes</Form.Label>
            <Form.Select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
              {product.availableSizes.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Button variant="primary" onClick={handleAddToCart}>Add to Cart</Button>
          <div className="social-icons text-center mt-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <Facebook size={30} color="#3b5998" className="mx-2" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Twitter size={30} color="#00acee" className="mx-2" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Instagram size={30} color="#C13584" className="mx-2" />
            </a>
          </div>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <ReviewsSection productId={product._id} reviews={product.reviews} />
        </Col>
      </Row>
    </Container>
  );
}

export default ProductPage;
