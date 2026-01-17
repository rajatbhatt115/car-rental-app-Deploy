import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaBan, FaShieldAlt, FaMapMarkerAlt, FaGasPump } from 'react-icons/fa';
import api from '../api/api';
import {
  FaCar,
  FaSuitcase,
  FaUsers,
  FaShip,
  FaUmbrellaBeach
} from "react-icons/fa";

const serviceIcons = {
  car: <FaCar size={52} />,
  suitcase: <FaSuitcase size={52} />,
  users: <FaUsers size={52} />,
  ship: <FaShip size={52} />,
  beach: <FaUmbrellaBeach size={52} />
};

// Icon mapping for features
const featureIcons = {
  FaBan: <FaBan size={30} />,
  FaShieldAlt: <FaShieldAlt size={30} />,
  FaMapMarkerAlt: <FaMapMarkerAlt size={30} />,
  FaGasPump: <FaGasPump size={30} />
};

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [rates, setRates] = useState([]);
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState({
    services: true,
    rates: true,
    features: true
  });
  const [error, setError] = useState({
    services: null,
    rates: null,
    features: null
  });

  // Mock data
  const mockServices = [
    // ... existing mock services data ...
  ];

  const mockRates = [
    { id: 1, days: "1-2 Days", discount: "2% Discount" },
    { id: 2, days: "2-5 Days", discount: "5% Discount" },
    { id: 3, days: "6-15 Days", discount: "10% Discount" },
    { id: 4, days: "10-15 Days", discount: "15% Discount" },
    { id: 5, days: "Above 15 Days", discount: "20% Discount" }
  ];

  const mockFeatures = [
    {
      id: 1,
      icon: "FaBan",
      title: "Free Cancellation",
      description: "Pellente ornare sem urpibur blandit tempus lacinia quam venenatis nulla metus auctor."
    },
    {
      id: 2,
      icon: "FaShieldAlt",
      title: "Theft Protection",
      description: "Pellente ornare sem urpibur blandit tempus lacinia quam venenatis nulla metus auctor."
    },
    {
      id: 3,
      icon: "FaMapMarkerAlt",
      title: "GPS on Every Vehicle",
      description: "Pellente ornare sem urpibur blandit tempus lacinia quam venenatis nulla metus auctor."
    },
    {
      id: 4,
      icon: "FaGasPump",
      title: "Refueling Policy",
      description: "Pellente ornare sem urpibur blandit tempus lacinia quam venenatis nulla metus auctor."
    }
  ];

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Fetch services
        try {
          const servicesResponse = await api.getServices();
          if (servicesResponse.data && servicesResponse.data.length > 0) {
            const formattedServices = servicesResponse.data.map(service => ({
              id: service.id || Date.now(),
              number: service.number || `0${service.id}`,
              title: service.title || "Service",
              icon: service.icon || "car",
              description: service.description || "No description available"
            }));
            setServices(formattedServices);
          } else {
            setServices(mockServices);
          }
        } catch (serviceErr) {
          console.error('Error fetching services:', serviceErr);
          setError(prev => ({ ...prev, services: 'Failed to load services. Using local data.' }));
          setServices(mockServices);
        } finally {
          setLoading(prev => ({ ...prev, services: false }));
        }

        // Fetch rates
        try {
          const ratesResponse = await api.getRates();
          if (ratesResponse.data && ratesResponse.data.length > 0) {
            setRates(ratesResponse.data);
          } else {
            setRates(mockRates);
          }
        } catch (ratesErr) {
          console.error('Error fetching rates:', ratesErr);
          setError(prev => ({ ...prev, rates: 'Failed to load rates. Using local data.' }));
          setRates(mockRates);
        } finally {
          setLoading(prev => ({ ...prev, rates: false }));
        }

        // Fetch features
        try {
          const featuresResponse = await api.getFeatures();
          if (featuresResponse.data && featuresResponse.data.length > 0) {
            setFeatures(featuresResponse.data);
          } else {
            setFeatures(mockFeatures);
          }
        } catch (featuresErr) {
          console.error('Error fetching features:', featuresErr);
          setError(prev => ({ ...prev, features: 'Failed to load features. Using local data.' }));
          setFeatures(mockFeatures);
        } finally {
          setLoading(prev => ({ ...prev, features: false }));
        }

      } catch (err) {
        console.error('Error in fetching data:', err);
      }
    };

    fetchAllData();
  }, []);

  // Check if all data is loading
  const isLoading = loading.services || loading.rates || loading.features;

  if (isLoading && services.length === 0 && rates.length === 0 && features.length === 0) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="warning" />
        <p className="mt-3">Loading services...</p>
      </Container>
    );
  }

  return (
    <>
      {/* Hero Section - Same as before */}
      <section className="hero-section-service">
        <Container>
          <Row className="align-items-center banner-gap">
            <Col lg={6}>
              <img src="/img/banner_service.png" alt="Services" className="img-fluid" />
            </Col>
            <Col lg={6}>
              <h1>Our <span className="highlight">Services</span></h1>
              <p className="lead mt-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </p>
              <nav className="breadcrumb-custom mt-3">
                <Link to="/" className="text-white text-decoration-none">Home</Link>
                <span className="mx-2 text-white">::</span>
                <span style={{ color: '#ff6b35' }}>Services</span>
              </nav>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Error Messages */}
      {error.services && <Alert variant="warning" className="mt-3">{error.services}</Alert>}
      {error.rates && <Alert variant="warning" className="mt-3">{error.rates}</Alert>}
      {error.features && <Alert variant="warning" className="mt-3">{error.features}</Alert>}

      {/* Services section - Same as before */}
      <section className="services-section">
        <Container>
          <Row className="mb-5">
            <h2 className="text-center">
              Our <span style={{ color: "#ff6b35" }}>Services</span>
            </h2>
          </Row>

          <Row className='d-flex justify-content-center'>
            {services.map((service) => (
              <Col lg={4} md={6} key={service.id} className="mb-4">
                <div className="service-card">
                  <div className="service-number">
                    {service.number}
                  </div>
                  <div className="service-icon text-warning mb-3">
                    {serviceIcons[service.icon] || <FaCar size={52} />}
                  </div>
                  <h3 className="service-title">
                    {service.title.split(" ").slice(0, -1).join(" ")}{" "}
                    <span style={{ color: "#ff6b35" }}>
                      {service.title.split(" ").slice(-1)}
                    </span>
                  </h3>
                  <p style={{ overflow: "visible", whiteSpace: "normal", display: "block", maxHeight: "none", WebkitLineClamp: "unset", WebkitBoxOrient: "unset" }}>
                    {service.description}
                  </p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section - Same as before */}
      <section className="cta-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h2 className="mb-4">
                Call <span style={{ color: '#ff6b35' }}>Now</span> & Book Our <span style={{ color: '#ff6b35' }}>Cab</span> For
                Your <span style={{ color: '#ff6b35' }}>Next</span> Ride.
              </h2>
              <Button size="lg" className="mt-3">
                Book Now
              </Button>
            </Col>
            <Col lg={6} className="text-center">
              <img src="/img/img_call.png" alt="Book Now" className="img-fluid" />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Pricing Section with API data */}
      <section className="pricing-section">
        <Container>
          <h2 className="d-flex justify-content-center align-items-center" style={{gap: "5px"}}>
            Our <span style={{color: "#ff6b35"}}>Rates</span>
          </h2>
          
          <div className="container mt-4">
            <Row className="justify-content-center">
              {/* Left Pricing Card */}
              <Col lg={4} md={6} className="col-12 mb-4">
                <div className="pricing-card">
                  <span className="discount-badge">Save Up To 30%</span>
                  <h3 className="mt-3 mb-4">Ride <span className="orange-text">More</span> Save <span className="orange-text">More.</span></h3>
                  
                  {loading.rates ? (
                    <div className="text-center py-3">
                      <Spinner animation="border" size="sm" variant="warning" />
                    </div>
                  ) : (
                    rates.map((item) => (
                      <div key={item.id} className="pricing-row">
                        <span>{item.days}</span>
                        <span className="discount-pill">{item.discount}</span>
                      </div>
                    ))
                  )}
                </div>
              </Col>

              {/* Right Feature Cards */}
              <Col lg={8} md={6} className="col-12">
                <Row>
                  {loading.features ? (
                    <Col md={6} className="col-12 mb-4">
                      <div className="text-center py-5">
                        <Spinner animation="border" variant="warning" />
                      </div>
                    </Col>
                  ) : (
                    features.map((feature) => (
                      <Col md={6} className="col-12 mb-4" key={feature.id}>
                        <div className="feature-card">
                          <div className="feature-icon-service">
                            {featureIcons[feature.icon] || <FaCar size={30} />}
                          </div>
                          <h5 style={{textAlign: 'start'}}>{feature.title}</h5>
                          <p style={{textAlign: 'start'}}>{feature.description}</p>
                        </div>
                      </Col>
                    ))
                  )}
                </Row>
              </Col>
            </Row>
          </div>
        </Container>
      </section>
    </>
  );
};

export default ServicesPage;