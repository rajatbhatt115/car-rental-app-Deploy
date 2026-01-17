import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

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

   // Home Services (Simple icons wali)
  getHomeServices: () => axios.get(`${API_BASE_URL}/homeServices`),

   // Company History
  getCompanyHistory: () => axios.get(`${API_BASE_URL}/companyHistory`),

  // Services Page Services (Numbered wali)
  getServices: () => axios.get(`${API_BASE_URL}/services`),
  getServiceById: (id) => axios.get(`${API_BASE_URL}/services/${id}`),

    // Rates for Services Page
  getRates: () => axios.get(`${API_BASE_URL}/rates`),
  getFeatures: () => axios.get(`${API_BASE_URL}/features`),

  // Stats
  getStats: () => Promise.resolve({
    data: {
      yearsExperience: 20,
      happyClients: 1000,
      totalCars: 50
    }
  })
};

export default api;