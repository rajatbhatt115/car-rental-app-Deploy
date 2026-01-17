import axios from 'axios';

// Decide base URL based on environment
const API_BASE_URL =
  window.location.hostname === 'localhost'
    ? process.env.REACT_APP_API_LOCAL
    : process.env.REACT_APP_API_LIVE;

const api = {
  // Home Page Cars (3 cars only)
  getCars: () => axios.get(`${API_BASE_URL}/cars`),
  getCarById: (id) => axios.get(`${API_BASE_URL}/cars/${id}`),

  // Cars Page Cars (9 cars for filtering)
  getFilterCars: () => axios.get(`${API_BASE_URL}/filterCars`),

  searchCars: (filters) => {
    const params = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) params.append(key, filters[key]);
    });
    return axios.get(`${API_BASE_URL}/filterCars?${params.toString()}`);
  },

  // Testimonials
  getTestimonials: () => axios.get(`${API_BASE_URL}/testimonials`),

  // Blogs
  getBlogs: () => axios.get(`${API_BASE_URL}/blogs`),
  getBlogById: (id) => axios.get(`${API_BASE_URL}/blogs/${id}`),

  // Team
  getTeam: () => axios.get(`${API_BASE_URL}/team`),

  // Home Services
  getHomeServices: () => axios.get(`${API_BASE_URL}/homeServices`),

  // Company History
  getCompanyHistory: () => axios.get(`${API_BASE_URL}/companyHistory`),

  // Services Page Services
  getServices: () => axios.get(`${API_BASE_URL}/services`),
  getServiceById: (id) => axios.get(`${API_BASE_URL}/services/${id}`),

  // Rates
  getRates: () => axios.get(`${API_BASE_URL}/rates`),
  getFeatures: () => axios.get(`${API_BASE_URL}/features`),

  // Stats
  getStats: () =>
    Promise.resolve({
      data: {
        yearsExperience: 20,
        happyClients: 1000,
        totalCars: 50
      }
    })
};

export default api;
