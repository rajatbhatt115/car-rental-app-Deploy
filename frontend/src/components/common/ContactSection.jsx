import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Message sent successfully!');
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  return (
    <section id="contact" className="bg-dark text-white" style={{paddingTop: '5rem', paddingBottom: '5rem'}}>
      <Container>
        <h2 className="text-center mb-5">
          Contact <span className="highlight">Us</span>
        </h2>
        
        <Row className="justify-content-center align-items-center">
          <Col lg={6} className="mb-4">
            <Form onSubmit={handleSubmit} className="p-4 rounded" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
              <Form.Group className="mb-3">
                <Form.Label>Your Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Your message"
                  required
                />
              </Form.Group>

              <Button type="submit" className="w-100">
                Send Message
              </Button>
            </Form>
          </Col>

          <Col lg={6} className="d-flex justify-content-center">
  <div className="contact-info p-4 text-start" style={{ maxWidth: "420px", width: "100%" }}>
    <div className="mb-4">
      <h5><FaMapMarkerAlt className="me-2" /> Address</h5>
      <p className="mt-2">123 Main Street, Ankleshwar, Gujarat, India</p>
    </div>

    <div className="mb-4">
      <h5><FaPhone className="me-2" /> Phone</h5>
      <p className="mt-2">+91 1234567890</p>
    </div>

    <div className="mb-4">
      <h5><FaEnvelope className="me-2" /> Email</h5>
      <p className="mt-2">info@carrental.com</p>
    </div>

    <div className="mb-4">
      <h5><FaClock className="me-2" /> Working Hours</h5>
      <p className="mt-2">24/7 Available</p>
    </div>
  </div>
</Col>
        </Row>
      </Container>
    </section>
  );
};

export default ContactSection;