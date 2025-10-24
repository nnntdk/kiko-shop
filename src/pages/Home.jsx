import React from 'react';
import { Link } from 'react-router-dom';
import logo from '/logo.jpg';

export default function Home() {
  const featuredProducts = [
    { name: 'Decorated Tin Box', image: '/tin-box-1.jpg'},
    { name: 'Muji Pencil Case', image: '/pencil-case-1.jpg'},
    { name: 'Muji Notebook', image: '/notebook-1.jpg' }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-main">
        <img src={logo} alt="Kiko's Studio" className="hero-main-logo" />
        <h1 className="hero-main-title">Kiko's Studio</h1>
        <p className="hero-tagline">handmade with love, sealed with shine ♡</p>
        <p className="hero-subtitle">✿ Customised goods, made just for you ✿</p>
        <div className="hero-buttons">
          <Link to="/products" className="btn-hero-main">Shop Now</Link>
          <Link to="/order" className="btn-hero-secondary">Order Form</Link>
        </div>
      </section>

      {/* Short Intro / About */}
      <section className="intro-section">
        <p className="intro-text">
          Welcome to <strong>Kiko's Studio</strong>, a tiny corner of happiness where we turn everyday items into something special ✧
        </p>
        <p className="intro-text">
          Each piece is hand-decorated and sealed with care using Mod Podge, so your items stay cute and glossy for a long, long time ♡
        </p>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <h2 className="featured-title">Some of Our Bestsellers</h2>
        <div className="featured-grid">
          {featuredProducts.map((product, index) => (
            <div key={index} className="featured-item">
              <div className="featured-image-container">
                <img src={product.image} alt={product.name} className="featured-image" />
              </div>
              <p className="featured-label">{product.emoji} {product.name}</p>
            </div>
          ))}
        </div>
        <Link to="/products" className="see-all-link">See all products →</Link>
      </section>

      {/* How to Order */}
      <section className="how-order-section">
        <h2 className="how-order-title">♡ How to Order ♡</h2>
        <div className="how-order-steps">
          <div className="how-step">
            <div className="step-circle">1</div>
            <p>Fill up the order form below with your details</p>
          </div>
          <div className="how-step">
            <div className="step-circle">2</div>
            <p>
              Drop us a DM on Instagram{' '}
              <a href="https://instagram.com/kiko.sstudio" target="_blank" rel="noopener noreferrer" className="instagram-inline-link">
                @kiko.sstudio
              </a>
            </p>
          </div>
          <div className="how-step">
            <div className="step-circle">3</div>
            <p>Pay for your order and wait for your handmade piece to arrive!</p>
          </div>
        </div>
        <Link to="/order" className="btn-order-now">Start Your Order</Link>
      </section>

{/* Follow & Join Us */}
      <section className="follow-section">
        <h2 className="follow-title">Stay Connected ✧</h2>
        <p className="follow-text">
          Follow us on Instagram and TikTok for behind-the-scenes peeks, new drops, and exclusive deals!
        </p>
        <div className="social-links">
          <a href="https://instagram.com/kiko.sstudio" target="_blank" rel="noopener noreferrer" className="social-link">
            📸 @kiko.sstudio
          </a>
          <a href="https://www.tiktok.com/@kiko.sstudio?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" className="social-link">
            🎵 TikTok
          </a>
          <a href="https://t.me/kikosstudio" target="_blank" rel="noopener noreferrer" className="social-link">
            💬 Telegram Channel →
          </a>
        </div>
      </section>
    </div>
  );
}
