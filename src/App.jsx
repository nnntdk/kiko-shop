import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Heart, Instagram } from 'lucide-react';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import OrderForm from './pages/OrderForm';
import './Shop.css';

// ScrollToTop component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="shop-container">
        {/* Sticky Navigation */}
        <nav className="sticky-nav">
          <Link to="/" className="nav-logo">Kiko's Studio</Link>
          <div className="nav-links">
            <Link to="/about" className="nav-link">About Us</Link>
            <Link to="/products" className="nav-link">Products</Link>
            <Link to="/order" className="nav-link">Order Form</Link>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/order" element={<OrderForm />} />
        </Routes>

        {/* Footer */}
        <footer className="modern-footer">
          <p>© 2025 Kiko's Studio — Handmade with Love ♡</p>
          <a href="https://instagram.com/kiko.sstudio" target="_blank" rel="noopener noreferrer" className="footer-link">
            <Instagram size={18} className="inline-icon" /> @kiko.sstudio
          </a>
        </footer>
      </div>
    </Router>
  );
}
