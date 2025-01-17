import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import auth context
import { Link } from 'react-router-dom'; // Import Link for navigation

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Get the login function from context

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { email, name: 'User' }; // Simulating user data, you can use actual data here
    login(userData);
    navigate('/'); // Redirect to homepage after login
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <h2>Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit" className="w-100 mt-3">
              Login
            </Button>
          </Form>

          <div className="mt-3 text-center">
            <p>Don't have an account?</p>
            <Link to="./Register.js">
              <Button variant="link" className="p-0">Register here</Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
