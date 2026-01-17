import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaComments, FaCalendar } from 'react-icons/fa';
import api from '../api/api';

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data for blogs
  const mockBlogs = [
    {
      id: 1,
      title: "New Fleet Addition",
      date: "25 Jan 2025",
      image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=250&fit=crop",
      excerpt: "We've added 10 new luxury vehicles to our fleet to serve you better.",
      // comments: 3
    },
    {
      id: 2,
      title: "Safety First Initiative",
      date: "20 Jan 2025",
      image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&h=250&fit=crop",
      excerpt: "All our vehicles now equipped with latest safety features and sanitized regularly.",
      // comments: 5
    },
    {
      id: 3,
      title: "Special Winter Offers",
      date: "15 Jan 2025",
      image: "https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=400&h=250&fit=crop",
      excerpt: "Book now and get up to 20% off on all weekly and monthly rentals.",
      // comments: 5
    }
  ];

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await api.getBlogs();
        setBlogs(response.data || mockBlogs);
        setError(null);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('Failed to load blogs. Using local data.');
        setBlogs(mockBlogs);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading && blogs.length === 0) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="warning" />
        <p className="mt-3">Loading blogs...</p>
      </Container>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section-about">
        <Container>
          <Row className="align-items-center banner-gap">
            <Col lg={6}>
              <img src="/img/img_blog.png" alt="Our Blogs" className="img-fluid" />
            </Col>
            <Col lg={6}>
              <h1>Our <span className="highlight">Blogs</span></h1>
              <p className="lead mt-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </p>
              <nav className="breadcrumb-custom mt-3">
                <Link to="/" className="text-white text-decoration-none">Home</Link>
                <span className="mx-2 text-white">::</span>
                <span style={{color: '#ff6b35'}}>Our Blogs</span>
              </nav>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Blogs Section */}
      <section className="news-section">
        <Container>
          <h2 className="text-center mb-5">News & <span className="highlight">Updates</span></h2>
          
          {error && <Alert variant="warning">{error}</Alert>}
          
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="warning" />
              <p className="mt-3">Loading blogs...</p>
            </div>
          ) : (
            <Row>
              {blogs.map((blog) => (
                <Col md={4} key={blog.id} className="mb-4">
                  <Card className="h-100 shadow">
                    <Card.Img 
                      variant="top" 
                      src={blog.image} 
                      alt={blog.title}
                      style={{ height: '250px', objectFit: 'cover' }}
                    />
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <Badge bg="warning" text="dark">
                          <FaCalendar className="me-1" /> {blog.date}
                        </Badge>
                        <small className="text-muted">
                          {/* <FaComments className="me-1" /> {blog.comments || 0} Comments */}
                        </small>
                      </div>
                      <Card.Title>{blog.title}</Card.Title>
                      <Card.Text>{blog.excerpt}</Card.Text>
                      <Button 
                        as={Link} 
                        to={`/blogs/${blog.id}`}
                        variant="primary"
                        size="sm"
                      >
                        Read More
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </section>
    </>
  );
};

export default BlogsPage;