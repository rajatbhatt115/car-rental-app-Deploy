import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FaCar } from 'react-icons/fa';

const CustomNavbar = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Navbar 
      bg="light" 
      expand="lg" 
      fixed="top" 
      className="shadow-sm py-3"
      collapseOnSelect
    >
      <Container>
        <Navbar.Brand 
          as={Link} 
          to="/" 
          className="fw-bold"
          onClick={scrollToTop}
        >
          <FaCar className="me-2" /> CarRental
        </Navbar.Brand>
        
        <Navbar.Toggle 
          aria-controls="navbarNav" 
          aria-label="Toggle navigation"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        />
        
        <Navbar.Collapse id="navbarNav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link 
              as={Link} 
              to="/" 
              className={`mx-2 ${isActive('/')}`}
              onClick={() => {
                scrollToTop();
                // Bootstrap collapse को manually trigger करें
                if (window.innerWidth < 992) {
                  document.querySelector('.navbar-toggler').click();
                }
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/about" 
              className={`mx-2 ${isActive('/about')}`}
              onClick={() => {
                scrollToTop();
                if (window.innerWidth < 992) {
                  document.querySelector('.navbar-toggler').click();
                }
              }}
            >
              About
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/services" 
              className={`mx-2 ${isActive('/services')}`}
              onClick={() => {
                scrollToTop();
                if (window.innerWidth < 992) {
                  document.querySelector('.navbar-toggler').click();
                }
              }}
            >
              Services
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/cars" 
              className={`mx-2 ${isActive('/cars')}`}
              onClick={() => {
                scrollToTop();
                if (window.innerWidth < 992) {
                  document.querySelector('.navbar-toggler').click();
                }
              }}
            >
              Our Cars
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/blogs" 
              className={`mx-2 ${isActive('/blogs')}`}
              onClick={() => {
                scrollToTop();
                if (window.innerWidth < 992) {
                  document.querySelector('.navbar-toggler').click();
                }
              }}
            >
              Blogs
            </Nav.Link>
            {/* <Button 
              as={Link} 
              to="/contact" 
              variant="primary" 
              className="ms-3 px-4"
              onClick={() => {
                scrollToTop();
                if (window.innerWidth < 992) {
                  document.querySelector('.navbar-toggler').click();
                }
              }}
            >
              Contact
            </Button> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;