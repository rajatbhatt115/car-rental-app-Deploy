import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Form, Button, Badge, Spinner, Alert } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { FaStar, FaCalendar, FaUser, FaComments, FaImage, FaTimes } from 'react-icons/fa';
import api from '../api/api';

const BlogDetailsPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const commentsSectionRef = useRef(null);
  
  // Comments state
  const [comments, setComments] = useState([
    {
      id: 1,
      name: "Ricky Johnson",
      date: "16/05/2023",
      avatar: "https://i.pravatar.cc/60?img=33",
      comment: "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxima placeat facere.",
      rating: 5
    },
    {
      id: 2,
      name: "Kristan Willmington",
      date: "26/03/2023",
      avatar: "https://i.pravatar.cc/60?img=45",
      comment: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour or randomised words which don't look even slightly believable.",
      rating: 4
    }
  ]);
  
  const [commentForm, setCommentForm] = useState({
    name: '',
    email: '',
    comment: '',
    rating: 5,
    avatar: null,
    avatarPreview: null
  });

  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setLoading(true);
        
        // Fetch specific blog by ID
        const blogResponse = await api.getBlogById(id);
        
        if (blogResponse.data) {
          // Update comments count based on current comments length
          setBlog({
            ...blogResponse.data,
            commentsCount: comments.length
          });
        } else {
          throw new Error('Blog not found');
        }
        
        // Fetch all blogs for sidebar
        const blogsResponse = await api.getBlogs();
        setBlogs(blogsResponse.data || []);
        
        setError(null);
      } catch (err) {
        console.error('Error fetching blog data:', err);
        setError('Failed to load blog details. Please try again later.');
        
        // Fallback to local mock data if API fails
        const mockBlogs = [
          {
            id: 1,
            title: "Essential Tips to Make Your Car Rental Experience Smooth & Hassle-Free",
            date: "29 Feb, 2024",
            author: "Admin",
            commentsCount: 3,
            image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800",
            excerpt: "We've added 10 new luxury vehicles to our fleet to serve you better.",
            content: `
              <p>Renting a car gives you complete freedom to explore your destination at your own pace.
              However, many travellers end up paying extra due to small mistakes or missing
              information. This guide shares practical tips that will help you enjoy a comfortable,
              safe, and budget-friendly rental experience.</p>
              
              <p>Always compare rental companies before booking. Look for offers that include insurance
              coverage, unlimited mileage, and 24/7 customer assistance. Paying attention to these
              details protects you from unnecessary charges later.</p>
            `
          },
          {
            id: 2,
            title: "Safety First Initiative",
            date: "20 Jan 2025",
            author: "Admin",
            commentsCount: 5,
            image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&h=250&fit=crop",
            excerpt: "All our vehicles now equipped with latest safety features and sanitized regularly.",
            content: `
              <p>At Tirth Travels, we prioritize your safety above all else. All our vehicles are now 
              equipped with the latest safety features including airbags, ABS, and real-time GPS tracking.</p>
              
              <p>We have implemented a rigorous sanitization process where every vehicle is thoroughly 
              cleaned and disinfected after each use. Our drivers are trained in safety protocols and 
              emergency procedures to ensure your journey is secure and comfortable.</p>
            `
          },
          {
            id: 3,
            title: "Special Winter Offers",
            date: "15 Jan 2025",
            author: "Admin",
            commentsCount: 5,
            image: "https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=400&h=250&fit=crop",
            excerpt: "Book now and get up to 20% off on all weekly and monthly rentals.",
            content: `
              <p>Book now and get up to 20% off on all weekly and monthly car rentals for a limited time. 
              This exclusive offer helps you save more on long-term bookings, whether for business travel, 
              vacations, or everyday commuting.</p>
              
              <p>Choose from a wide range of clean, well-maintained vehicles equipped with modern features 
              to ensure safety and comfort on every journey. With transparent pricing, reliable service, 
              and dedicated customer support, we make your rental experience smooth and stress-free.</p>
              
              <p>Hurry—this limited-time discount won't last long!</p>
            `
          }
        ];
        
        // Find blog from mock data by ID
        const foundBlog = mockBlogs.find(blog => blog.id === parseInt(id));
        
        if (foundBlog) {
          setBlog({
            ...foundBlog,
            commentsCount: comments.length
          });
          setBlogs(mockBlogs);
        } else {
          // If blog not found in mock data, use first one
          setBlog({
            ...mockBlogs[0],
            commentsCount: comments.length
          });
          setBlogs(mockBlogs);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [id, comments.length]);

  const latestNews = [
    "Luxury SUVs added to our rental fleet for weekend travelers.",
    "Winter road trip discounts now available for long-distance bookings.",
    "Self-drive rentals rise in popularity among young travellers.",
    "5 scenic destinations perfect for a road trip this season.",
    "All vehicles now updated with enhanced safety checks."
  ];

  const handleCommentChange = (e) => {
    setCommentForm({
      ...commentForm,
      [e.target.name]: e.target.value
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        alert('File size should be less than 2MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setCommentForm({
          ...commentForm,
          avatarPreview: reader.result
        });
      };
      reader.readAsDataURL(file);
      setAvatarFile(file);
    }
  };

  const removeAvatar = () => {
    setCommentForm({
      ...commentForm,
      avatarPreview: null
    });
    setAvatarFile(null);
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    
    // Form validation
    if (!commentForm.name.trim() || !commentForm.comment.trim()) {
      alert('Please fill in all required fields');
      return;
    }
    
    let avatarUrl = commentForm.avatarPreview;
    
    // If no avatar uploaded, use random avatar
    if (!avatarUrl) {
      avatarUrl = `https://i.pravatar.cc/60?img=${Math.floor(Math.random() * 70) + 1}`;
    }
    
    // Create new comment object
    const newComment = {
      id: comments.length + 1,
      name: commentForm.name,
      date: new Date().toLocaleDateString('en-GB'),
      avatar: avatarUrl,
      comment: commentForm.comment,
      rating: parseInt(commentForm.rating) || 5
    };
    
    // Add new comment to comments array
    setComments(prevComments => [newComment, ...prevComments]);
    
    // Update blog's comment count
    if (blog) {
      setBlog(prevBlog => ({
        ...prevBlog,
        commentsCount: prevBlog.commentsCount + 1
      }));
    }
    
    // Reset form
    setCommentForm({
      name: '',
      email: '',
      comment: '',
      rating: 5,
      avatar: null,
      avatarPreview: null
    });
    setAvatarFile(null);
    
    // Scroll to comments section
    setTimeout(() => {
      if (commentsSectionRef.current) {
        commentsSectionRef.current.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
    
    // Show success message
    alert('Thank you for your comment! It has been added.');
  };

  if (loading && !blog) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="warning" />
        <p className="mt-3">Loading blog details...</p>
      </Container>
    );
  }

  if (!blog && !loading) {
    return (
      <Container className="text-center py-5">
        <Alert variant="danger">
          <h4>Blog Not Found</h4>
          <p>The blog you're looking for doesn't exist.</p>
          <Link to="/blogs" className="btn btn-warning mt-2">
            Back to Blogs
          </Link>
        </Alert>
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
              <img src="/img/img_blog.png" alt="Blog Details" className="img-fluid" />
            </Col>
            <Col lg={6}>
              <h1>Blog <span className="highlight">Details</span></h1>
              <p className="lead mt-3">
                Read our latest insights and tips about car rentals and travel.
              </p>
              <nav className="breadcrumb-custom mt-3">
                <Link to="/" className="text-white text-decoration-none">Home</Link>
                <span className="mx-2 text-white">::</span>
                <Link to="/blogs" className="text-white text-decoration-none">Our Blogs</Link>
                <span className="mx-2 text-white">::</span>
                <span style={{color: '#ff6b35'}}>Blog Details</span>
              </nav>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Main Content - Blog Details */}
      <section className="blog-content-details">
        <Container>
          {error && <Alert variant="warning">{error}</Alert>}
          
          <Row>
            {/* Main Blog Post */}
            <Col lg={8}>
              {loading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" variant="warning" />
                  <p className="mt-3">Loading blog content...</p>
                </div>
              ) : blog && (
                <div className="blog-post-card">
                  <img 
                    src={blog.image} 
                    alt={blog.title} 
                    className="blog-post-image" 
                  />
                  
                  <div className="blog-post-meta">
                    <span className="date-badge">{blog.date}</span>
                    <span className="author-info">
                      <FaUser className="me-1" /> By {blog.author}
                    </span>
                    <span className="comments-info">
                      <FaComments className="me-1" /> {blog.commentsCount || 0} Comments
                    </span>
                  </div>

                  <div className="blog-post-content">
                    <h2>{blog.title}</h2>
                    
                    <div 
                      className="blog-content mt-4"
                      dangerouslySetInnerHTML={{ __html: blog.content || blog.excerpt }}
                    />
                    
                    {/* Author Box */}
                    <div className="author-box">
                      <img 
                        src="https://i.pravatar.cc/60?img=12" 
                        alt="Author" 
                        className="author-avatar" 
                      />
                      <div>
                        <p className="author-name">Ricky Johnson</p>
                        <p className="author-bio">Travel Expert & Automobile Writer</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Col>

            {/* Sidebar */}
            <Col lg={4}>
              {/* Latest News Widget */}
              <div className="sidebar-widget">
                <h4 className="widget-title">Latest News</h4>
                <ul className="widget-list">
                  {latestNews.map((news, index) => (
                    <li key={index}>{news}</li>
                  ))}
                </ul>
              </div>

              {/* Popular Posts */}
              <div className="sidebar-widget">
                <h4 className="widget-title">Popular Posts</h4>
                
                {blogs.slice(0, 5).map((post) => (
                  <div className="popular-post-item" key={post.id}>
                    <img src={post.image} alt={post.title} />
                    <div>
                      <div className="popular-post-date">
                        <FaCalendar className="me-1" /> {post.date}
                      </div>
                      <div className="popular-post-title">{post.title}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Comments Section */}
      <section className="comments-section" ref={commentsSectionRef}>
        <Container className="comment-sec">
          <Row>
            <Col md={6}>
              <div className="comments-section">
                <h3 className="section-title">Leave A <span className="orange-text">Comment.</span></h3>
                <form className="comment-form" onSubmit={handleSubmitComment}>
                  <div className="row">
                    <div className="col-md-6">
                      <input 
                        type="text" 
                        className="form-control mb-3" 
                        placeholder="Your Name*" 
                        name="name"
                        value={commentForm.name}
                        onChange={handleCommentChange}
                        required 
                      />
                    </div>
                    <div className="col-md-6">
                      <input 
                        type="email" 
                        className="form-control mb-3" 
                        placeholder="Email Address*" 
                        name="email"
                        value={commentForm.email}
                        onChange={handleCommentChange}
                        required 
                      />
                    </div>
                  </div>
                  
                  {/* Avatar Upload */}
                  <div className="mb-3">
                    <label className="form-label d-block">
                      Upload Your Photo (Optional)
                    </label>
                    <div className="d-flex align-items-center">
                      {commentForm.avatarPreview ? (
                        <div className="position-relative me-3">
                          <img 
                            src={commentForm.avatarPreview} 
                            alt="Preview" 
                            className="rounded-circle"
                            style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                          />
                          <button
                            type="button"
                            className="btn btn-sm btn-danger position-absolute top-0 end-0 p-0"
                            style={{ width: '20px', height: '20px', borderRadius: '50%' }}
                            onClick={removeAvatar}
                          >
                            <FaTimes size={10} />
                          </button>
                        </div>
                      ) : (
                        <label className="btn btn-outline-secondary me-3">
                          <FaImage className="me-2" />
                          Choose File
                          <input 
                            type="file" 
                            className="d-none" 
                            accept="image/*"
                            onChange={handleAvatarChange}
                          />
                        </label>
                      )}
                      <small className="text-muted">
                        {avatarFile ? avatarFile.name : 'Max 2MB, JPG/PNG'}
                      </small>
                    </div>
                  </div>
                  
                  <textarea 
                    className="form-control mb-3" 
                    placeholder="Your Comment*" 
                    name="comment"
                    value={commentForm.comment}
                    onChange={handleCommentChange}
                    required
                    rows="4"
                  ></textarea>
                  
                  {/* Rating Selection (Optional) */}
                  <div className="mb-3">
                    <label className="form-label">Rating (Optional)</label>
                    <select 
                      className="form-control"
                      name="rating"
                      value={commentForm.rating}
                      onChange={handleCommentChange}
                    >
                      <option value="5">5 Stars - Excellent</option>
                      <option value="4">4 Stars - Very Good</option>
                      <option value="3">3 Stars - Good</option>
                      <option value="2">2 Stars - Fair</option>
                      <option value="1">1 Star - Poor</option>
                    </select>
                  </div>
                  
                  <button type="submit" className="submit-btn w-100">
                    Leave Comment
                  </button>
                </form>
              </div>
            </Col>

            <Col md={6}>
              <div className="comments-section">
                <h3 className="section-title mb-4">
                  Comment <span className="orange-text">List</span>
                </h3>
                
                {/* Comments Container with Scrollbar */}
                <div 
                  className="comments-container"
                  style={{
                    maxHeight: '500px',
                    overflowY: 'auto',
                    paddingRight: '10px'
                  }}
                >
                  {comments.length === 0 ? (
                    <div className="text-center py-4">
                      <p className="text-muted">No comments yet. Be the first to comment!</p>
                    </div>
                  ) : (
                    comments.map((comment) => (
                      <div className="comment-item mb-4" key={comment.id}>
                        <div className="d-flex">
                          <div className="me-3">
                            <img 
                              src={comment.avatar} 
                              alt={comment.name} 
                              className="rounded-circle"
                              style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                            />
                          </div>
                          <div className="flex-grow-1">
                            <div className="d-flex justify-content-between align-items-start mb-2">
                              <div>
                                <div className="comment-author fw-bold">
                                  {comment.name}
                                </div>
                                <div className="comment-date text-muted small">
                                  <FaCalendar className="me-1" /> {comment.date}
                                </div>
                              </div>
                              <div className="comment-rating">
                                {[...Array(5)].map((_, i) => (
                                  <FaStar 
                                    key={i} 
                                    className={i < comment.rating ? 'text-warning' : 'text-secondary'}
                                    style={{ fontSize: '14px', marginRight: '1px' }}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="comment-text mb-0" style={{ fontSize: '15px' }}>
                              {comment.comment}
                            </p>
                          </div>
                        </div>
                        <hr className="my-3" />
                      </div>
                    ))
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default BlogDetailsPage;