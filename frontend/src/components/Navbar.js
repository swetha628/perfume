import React from 'react';
import { Navbar, Nav, Container, Badge, Dropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook
import { useCart } from '../context/CartContext'; // Import the useCart hook

function NavigationBar() {
  const { user, logout } = useAuth(); // Get user and logout function from context
  const { cart } = useCart(); // Get cart state from the CartContext

  return (
    <Navbar expand="lg" sticky="top" className="custom-navbar">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className="navbar-brand">Perfume Shop</Navbar.Brand>
        </LinkContainer>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto nav-links">
            <LinkContainer to="/">
              <Nav.Link className="nav-link">Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link className="nav-link">About</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/contact">
              <Nav.Link className="nav-link">Contact</Nav.Link>
            </LinkContainer>

            {/* Cart Icon with Item Count */}
            <LinkContainer to="/cart">
              <Nav.Link className="nav-link">
                Cart
                {cart.length > 0 && (
                  <Badge pill bg="danger" className="ms-2">
                    {cart.length}
                  </Badge>
                )}
              </Nav.Link>
            </LinkContainer>

            {/* Dropdown for user profile and logout */}
            {user ? (
              <Dropdown align="end">
                <Dropdown.Toggle variant="link" id="user-dropdown" className="nav-link">
                  Welcome, {user.name} {/* Display username */}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <LinkContainer to="/profile">
                    <Dropdown.Item>Profile</Dropdown.Item>
                  </LinkContainer>
                  <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link className="nav-link">Login</Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
