import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../api/api';

const CarsPage = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    type: '',
    seats: '',
    bags: '',
    maxPrice: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data as fallback
  const mockFilterCars = [
    {
      "id": 1,
      "category": "Economy",
      "type": "Sedan",
      "seats": 4,
      "bags": 2,
      "ac": true,
      "hourlyRate": 400,
      "dailyRate": 3500,
      "image": "https://images.unsplash.com/photo-1642130204821-74126d1cb88e?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "description": "4 Seats • 2 Bags • AC"
    },
    {
      "id": 2,
      "category": "SUV",
      "type": "SUV",
      "seats": 7,
      "bags": 3,
      "ac": true,
      "hourlyRate": 600,
      "dailyRate": 5500,
      "image": "https://images.unsplash.com/photo-1706682783267-c2a92ddac5a6?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "description": "7 Seats • 3 Bags • AC"
    },
    {
      "id": 3,
      "category": "Luxury",
      "type": "Premium",
      "seats": 4,
      "bags": 3,
      "ac": true,
      "hourlyRate": 900,
      "dailyRate": 8500,
      "image": "https://images.unsplash.com/photo-1674795841496-e4b30bc14db5?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "description": "4 Seats • 3 Bags • Premium AC"
    },
    {
      "id": 4,
      "category": "Economy",
      "type": "Hatchback",
      "seats": 4,
      "bags": 2,
      "ac": true,
      "hourlyRate": 350,
      "dailyRate": 3000,
      "image": "https://images.unsplash.com/photo-1731916508420-48223500a882?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "description": "4 Seats • 2 Bags • AC"
    },
    {
      "id": 5,
      "category": "SUV",
      "type": "Compact SUV",
      "seats": 5,
      "bags": 3,
      "ac": true,
      "hourlyRate": 550,
      "dailyRate": 5000,
      "image": "https://images.unsplash.com/photo-1715822425520-39f7778c9404?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "description": "5 Seats • 3 Bags • AC"
    },
    {
      "id": 6,
      "category": "Luxury",
      "type": "Premium Sedan",
      "seats": 4,
      "bags": 3,
      "ac": true,
      "hourlyRate": 1200,
      "dailyRate": 11000,
      "image": "https://images.unsplash.com/photo-1705624843697-4461f9dce482?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "description": "4 Seats • 3 Bags • Premium AC"
    },
    {
      "id": 7,
      "category": "Economy",
      "type": "Compact",
      "seats": 5,
      "bags": 2,
      "ac": true,
      "hourlyRate": 300,
      "dailyRate": 2500,
      "image": "https://images.unsplash.com/photo-1651751234256-86187ebf7302?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "description": "5 Seats • 2 Bags • AC"
    },
    {
      "id": 8,
      "category": "SUV",
      "type": "Full-size SUV",
      "seats": 8,
      "bags": 4,
      "ac": true,
      "hourlyRate": 800,
      "dailyRate": 7000,
      "image": "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=500",
      "description": "8 Seats • 4 Bags • AC"
    },
    {
      "id": 9,
      "category": "Luxury",
      "type": "Executive Sedan",
      "seats": 4,
      "bags": 3,
      "ac": true,
      "hourlyRate": 1500,
      "dailyRate": 12000,
      "image": "https://images.unsplash.com/photo-1685483143087-bf4db9542633?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "description": "4 Seats • 3 Bags • Premium AC"
    }
  ];

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      setLoading(true);
      setError(null);

      // Try to fetch from API first
      const response = await api.getFilterCars();

      if (response.data && response.data.length > 0) {
        setCars(response.data);
        setFilteredCars(response.data);
      } else {
        // If API returns empty, use mock data
        setError('API returned empty data. Using local data.');
        setCars(mockFilterCars);
        setFilteredCars(mockFilterCars);
      }
    } catch (err) {
      console.error('Error fetching cars:', err);
      // If API fails, use mock data
      setError('Failed to load cars from API. Using local data.');
      setCars(mockFilterCars);
      setFilteredCars(mockFilterCars);
    } finally {
      setLoading(false);
    }
  };

  const handleRazorpayPayment = (car, type) => {
    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded");
      return;
    }

    const amount =
      type === "hour"
        ? car.hourlyRate * 100
        : car.dailyRate * 100;

    const options = {
      key: "rzp_test_1DP5mmOlF5G5ag", // replace with your Razorpay test/live key
      amount: amount,
      currency: "INR",
      name: "Car Rentals",
      description:
        type === "hour"
          ? `${car.type} - Hourly Booking`
          : `${car.type} - Daily Booking`,
      handler: function (response) {
        alert("Payment Successful 🎉");
        console.log(response);
      },
      prefill: {
        name: "Test User",
        email: "test@gmail.com",
        contact: "9999999999",
      },
      theme: {
        color: "#ff6633",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };


  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const applyFilters = async () => {
    try {
      setLoading(true);

      const hasFilters = Object.values(filters).some(value => value !== '');

      if (hasFilters) {
        try {
          // Try API search first
          const response = await api.searchCars(filters);
          if (response.data && response.data.length > 0) {
            setFilteredCars(response.data);
          } else {
            // If no results from API, try client-side filtering
            applyClientSideFilters();
          }
        } catch (apiErr) {
          console.error('API search failed, using client-side filtering:', apiErr);
          applyClientSideFilters();
        }
      } else {
        // No filters applied, show all cars
        setFilteredCars(cars);
      }
    } finally {
      setLoading(false);
    }
  };

  const applyClientSideFilters = () => {
    let filtered = [...cars];

    if (filters.category) {
      filtered = filtered.filter(car =>
        car.category.toLowerCase().includes(filters.category.toLowerCase())
      );
    }

    if (filters.type) {
      filtered = filtered.filter(car =>
        car.type.toLowerCase().includes(filters.type.toLowerCase())
      );
    }

    if (filters.seats) {
      filtered = filtered.filter(car => car.seats === parseInt(filters.seats));
    }

    if (filters.bags) {
      filtered = filtered.filter(car => car.bags === parseInt(filters.bags));
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(car => car.hourlyRate <= parseInt(filters.maxPrice));
    }

    setFilteredCars(filtered);
  };

  const resetFilters = () => {
    setFilters({
      category: '',
      type: '',
      seats: '',
      bags: '',
      maxPrice: ''
    });
    setFilteredCars(cars);
  };

  const categories = [...new Set(cars.map(car => car.category))];
  const types = [...new Set(cars.map(car => car.type))];
  const seatsOptions = [...new Set(cars.map(car => car.seats))].sort((a, b) => a - b);
  const bagsOptions = [...new Set(cars.map(car => car.bags))].sort((a, b) => a - b);

  if (loading && cars.length === 0) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="warning" />
        <p className="mt-3">Loading cars...</p>
      </Container>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section-our-cars">
        <Container>
          <Row className="align-items-center banner-gap">
            <Col lg={6}>
              <img src="/img/banner_our_ cars.png" alt="Our Cars" className="img-fluid" style={{ width: 'auto', height: '382px' }} />
            </Col>
            <Col lg={6}>
              <h1>Our <span className="highlight">Cars</span></h1>
              <p className="lead mt-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </p>
              <nav className="breadcrumb-custom mt-3">
                <Link to="/" className="text-white text-decoration-none">Home</Link>
                <span className="mx-2 text-white">::</span>
                <span style={{ color: '#ff6b35' }}>Our Cars</span>
              </nav>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Cars Section with Filters */}
      <section>
        <Container className="rates-section">
          <h1 className="page-title">Flexible <span className="orange-text">Rates</span></h1>

          {error && (
            <Alert variant="warning" className="mb-3">
              {error}
            </Alert>
          )}

          <Row>
            {/* Filter Sidebar */}
            <Col lg={3} md={4} className="mb-4">
              <div className="filter-sidebar">
                <h4>Filter Vehicles</h4>

                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <Form.Select
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Categories</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category}>{category}</option>
                    ))}
                  </Form.Select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Vehicle Type</label>
                  <Form.Select
                    name="type"
                    value={filters.type}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Types</option>
                    {types.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </Form.Select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Seats</label>
                  <Form.Select
                    name="seats"
                    value={filters.seats}
                    onChange={handleFilterChange}
                  >
                    <option value="">Any</option>
                    {seatsOptions.map((seat, index) => (
                      <option key={index} value={seat}>{seat} Seats</option>
                    ))}
                  </Form.Select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Bags</label>
                  <Form.Select
                    name="bags"
                    value={filters.bags}
                    onChange={handleFilterChange}
                  >
                    <option value="">Any</option>
                    {bagsOptions.map((bag, index) => (
                      <option key={index} value={bag}>{bag} Bags</option>
                    ))}
                  </Form.Select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Max Price per Hour (₹)</label>
                  <Form.Control
                    type="number"
                    name="maxPrice"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    placeholder="Enter max price"
                    min="0"
                  />
                </div>

                <div className="d-grid gap-2">
                  <Button
                    style={{ backgroundColor: '#ff6b35', border: 'none', width: '100%' }}
                    onClick={applyFilters}
                    disabled={loading}
                  >
                    {loading ? 'Applying...' : 'Apply Filters'}
                  </Button>
                  <Button
                    variant="outline-secondary"
                    onClick={resetFilters}
                    style={{ width: '100%' }}
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>
            </Col>

            {/* Cars Grid */}
            <Col lg={9} md={8}>
              {loading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" variant="warning" />
                  <p className="mt-3">Loading cars...</p>
                </div>
              ) : filteredCars.length === 0 ? (
                <div id="noResults" className="no-results" style={{ display: 'block' }}>
                  <p className="text-center">No vehicles found matching your filters.</p>
                  <Button
                    variant="outline-warning"
                    onClick={resetFilters}
                    className="mt-3 d-block mx-auto"
                  >
                    Reset Filters
                  </Button>
                </div>
              ) : (
                <Row>
                  {filteredCars.map((car) => (
                    <Col lg={4} md={6} key={car.id} className="mb-4">
                      <div className="car-card">
                        <span className="category-badge">{car.category}</span>
                        <img
                          src={car.image}
                          alt={car.type}
                          className="car-image-filter"
                          onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400&auto=format&fit=crop";
                          }}
                        />
                        <div className="car-details">
                          <h4 className="car-title">{car.type}</h4>
                          <p className="car-specs">{car.description}</p>
                          <div className="pricing-section p-3">
                            <div className="price-row">
                              <span className="price-label">Per Hour:</span>
                              <span className="price-value">₹{car.hourlyRate}/-</span>
                            </div>
                            <div className="price-row mt-2">
                              <span className="price-label">Per Day:</span>
                              <span className="price-value">₹{car.dailyRate}/-</span>
                            </div>
                          </div>
                          <div className="d-grid gap-2 mt-2">
                            <Button
                              className="book-btn2"
                              style={{
                                backgroundColor: '#ff6633',
                                border: 'none',
                                padding: '12px',
                                borderRadius: '8px',
                                fontWeight: '400',
                                fontSize: '1.0rem',
                                cursor: 'pointer',
                                transition: 'background 0.3s ease'
                              }}
                              onClick={() => handleRazorpayPayment(car, 'hour')}
                            >
                              Book Per Hour
                            </Button>
                            <Button
                              className="book-btn2"
                              style={{
                                backgroundColor: '#ff3300',
                                border: 'none',
                                padding: '12px',
                                borderRadius: '8px',
                                fontWeight: '400',
                                fontSize: '1.0rem',
                                cursor: 'pointer',
                                transition: 'background 0.3s ease',
                                marginbottom: '0px'
                              }}
                              onClick={() => handleRazorpayPayment(car, 'day')}
                            >
                              Book Per Day
                            </Button>
                          </div>

                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default CarsPage;