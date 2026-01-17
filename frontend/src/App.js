import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import CustomNavbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Cars from './pages/Cars';
import Blogs from './pages/Blogs';
import BlogDetails from './pages/BlogDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <CustomNavbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;