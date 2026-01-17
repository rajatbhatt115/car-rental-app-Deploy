import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log('Subscribed with email:', email);
    setEmail('');
    alert('Thank you for subscribing!');
  };

  // Function to scroll to top when navigating
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="text-white">
      <Container>
        <Row className="justify-content-between">
          <Col lg={4} md={6} className="mb-4">
            <h5>About Us</h5>
            <p className="mt-3">
              We are a leading car rental service provider offering quality vehicles at affordable prices.
            </p>
            <div className="footer-social mt-3">
              <a href="#" className="text-white me-3"><FaFacebook size={20} /></a>
              <a href="#" className="text-white me-3"><FaTwitter size={20} /></a>
              <a href="#" className="text-white me-3"><FaInstagram size={20} /></a>
              <a href="#" className="text-white"><FaLinkedin size={20} /></a>
            </div>
          </Col>

          <Col
            lg={4}
            md={6}
            className="mb-4 d-lg-flex justify-content-lg-center"
          >
            <div className="text-start">
              <h5>Quick Links</h5>
              <div className="footer-links mt-3">
                <Link 
                  to="/" 
                  onClick={scrollToTop}
                  className="text-white d-block mb-2 text-decoration-none"
                >
                  Home
                </Link>
                <Link 
                  to="/about" 
                  onClick={scrollToTop}
                  className="text-white d-block mb-2 text-decoration-none"
                >
                  About
                </Link>
                <Link 
                  to="/services" 
                  onClick={scrollToTop}
                  className="text-white d-block mb-2 text-decoration-none"
                >
                  Services
                </Link>
                <Link 
                  to="/cars" 
                  onClick={scrollToTop}
                  className="text-white d-block mb-2 text-decoration-none"
                >
                  Our Cars
                </Link>
                <Link 
                  to="/blogs" 
                  onClick={scrollToTop}
                  className="text-white d-block mb-2 text-decoration-none"
                >
                  Blogs
                </Link>
              </div>
            </div>
          </Col>

          <Col lg={4} md={6} className="mb-4">
            <h5>Newsletter</h5>
            <p className="mt-3">Subscribe to get latest updates and offers.</p>
            <Form className="d-flex mt-3" onSubmit={handleSubscribe}>
              <Form.Control
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="me-2"
              />
              <Button variant="dark" type="submit">Subscribe</Button>
            </Form>
          </Col>
        </Row>

        <hr className="bg-white my-4" />

        <div className="text-center">
          <p className="mb-3">&copy; 2025 Car Rental. All Rights Reserved. Designed with mysite.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;