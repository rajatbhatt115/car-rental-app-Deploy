import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaBullseye, FaLightbulb, FaHandHoldingHeart, FaChevronRight } from 'react-icons/fa';
import api from '../api/api';

const AboutPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [companyHistory, setCompanyHistory] = useState([]);

  // Remove team-related state and useEffect

  useEffect(() => {
    const fetchCompanyHistory = async () => {
      try {
        setLoading(true);
        const response = await api.getCompanyHistory();
        setCompanyHistory(response.data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching company history:', err);
        setError('Failed to load company history data.');
        setCompanyHistory([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyHistory();
  }, []);

  return (
    <>
      {/* Hero Section - No changes */}
      <section className="hero-section-about">
        <Container>
          <Row className="align-items-center banner-gap">
            <Col lg={6}>
              <img src="/img/banner_about.png" alt="About Us" className="img-fluid" />
            </Col>
            <Col lg={6}>
              <h1>About <span className="highlight">Us</span></h1>
              <p className="lead mt-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <nav className="breadcrumb-custom mt-3">
                <Link to="/" className="text-white text-decoration-none">Home</Link>
                <span className="mx-2 text-white">::</span>
                <span style={{color: '#ff6b35'}}>About Us</span>
              </nav>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Trusted Service Section - No changes */}
      <section className="trusted-service">
        <Container>
          <h2>Our <span className="highlight">Trusted</span> Service</h2>
          <Row className="mb-4">
            <Col md={6}>
              <div className="service-point">
                <FaChevronRight className="me-2" style={{color: '#ff6b35'}} />
                <span>We promise to deliver our best service to you to achieve your smile.</span>
              </div>
            </Col>
            <Col md={6}>
              <div className="service-point">
                <FaChevronRight className="me-2" style={{color: '#ff6b35'}} />
                <span>Car rentals is Luxurious A/c & non A/c car provider</span>
              </div>
            </Col>
          </Row>

          <Row className="align-items-center">
            <Col lg={6}>
              <div className="service-content">
                <p>Car rentals is a car rental company in premium and high-end car sector. We hence maintain
                  most of the latest cars that provide the impeccable in luxury, comfort and are most
                  dependable.</p>

                <p>A brainchild Mr. Nirmal V. Shah, (Proprietor) of Car rentals was launched in the year 2007
                  with a short-term vision of becoming a medium of travel for customers and a long-term vision
                  of giving form and structure to the unorganized Indian personal ground transportation
                  industry and helping the same evolve into an organized grounded industry.</p>

                <p>Car rentals was set out about a decade ago with only a few cars. Car rentals is now One
                  of the major car provider company in Surat-Ankleshwar belt. Now more than 80 vehicle running
                  on roads to satisfy our clients.</p>

                <p>It is to Nirmal shah's credit that Personal Ground Transportation is the "Core" business of
                  Car rentals. It is perhaps the first and the only player to offer complete 360 degree
                  solutions to completely meet the challenges that personal ground transportation industry
                  into an organized business.</p>

                <p>Providing all types of Ac and Non Ac luxurious vehicles like Indica, Innova, Scorpio, Xylo,
                  Tavera, Fortuner, Indigo, Traveller, Trax, Minibus, bus and many more on Daily, Monthly and
                  Call basis as per requirement of clients.</p>

                <p>All vehicles equipped with GPS TRACKER so, we can check the location of vehicle, speed,
                  timings, average, total Km running.</p>

                <p>Although we are well known company in car rental industry, even till date we are with an
                  undaunted attitude of giving that first class service to our clients.</p>
              </div>
            </Col>
            <Col lg={6}>
              <div className="car-image-section">
                <img src="/img/img3.png" alt="Luxury Car" className="img-fluid rounded shadow" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Company History Section - Now Dynamic */}
      <section className="history-section">
        <Container>
          <h2>Our <span className="highlight">Company History</span></h2>

          {loading ? (
            <div className="text-center py-4">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2">Loading company history...</p>
            </div>
          ) : error ? (
            <Alert variant="warning">{error}</Alert>
          ) : (
            <div className="timeline">
              {companyHistory.map((item, index) => (
                <div key={item.id || index} className="timeline-card">
                  <div className="timeline-year">{item.year}</div>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* Mission Vision Values - No changes */}
      <section className="mvv-section">
        <Container>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="mvv-card">
                <div className="mvv-number">01</div>
                <div className="mvv-icon">
                  <FaBullseye />
                </div>
                <h4>Our <span className="highlight">Mission.</span></h4>
                <p>There are many variations of passages of Lorem Ipsum available, but the majority have
                  suffered alteration in some form, by injected humour, or randomised words which don't look
                  even slightly believable.</p>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="mvv-card">
                <div className="mvv-number">02</div>
                <div className="mvv-icon">
                  <FaLightbulb />
                </div>
                <h4>Our <span className="highlight">Vision.</span></h4>
                <p>There are many variations of passages of Lorem Ipsum available, but the majority have
                  suffered alteration in some form, by injected humour, or randomised words which don't look
                  even slightly believable.</p>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="mvv-card">
                <div className="mvv-number">03</div>
                <div className="mvv-icon">
                  <FaHandHoldingHeart />
                </div>
                <h4>Our <span className="highlight">Values.</span></h4>
                <p>There are many variations of passages of Lorem Ipsum available, but the majority have
                  suffered alteration in some form, by injected humour, or randomised words which don't look
                  even slightly believable.</p>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AboutPage;