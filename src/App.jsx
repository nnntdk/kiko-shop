import React, { useEffect, useContext } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Instagram, ShoppingCart } from 'lucide-react';
import { CartProvider, CartContext } from './CartContext';
import About from './pages/About';
import Products from './pages/Products';
import Order from "./pages/Order";


import './Shop.css';


// Import product images
import tinBox1 from './assets/tin-box-1.JPG';
import pencilCase1 from './assets/pencil-case-1.JPG';
import notebook1 from './assets/notebook-1.JPG';


// ScrollToTop component
function ScrollToTop() {
  const { pathname } = useLocation();


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);


  return null;
}


// Home component inline
function Home() {
  const featuredProducts = [
    { name: 'Decorated Tin Box', image: tinBox1, emoji: '🎁' },
    { name: 'Muji Pencil Case', image: pencilCase1, emoji: '✏️' },
    { name: 'Muji Notebook', image: notebook1, emoji: '📓' }
  ];


  return (
    <div className="home-page">
      <section className="hero-main">
        <img src="logo.jpg" alt="Kiko's Studio" className="hero-main-logo" />
        <h1 className="hero-main-title">Kiko's Studio</h1>
        <p className="hero-tagline">handmade with love, sealed with shine ♡</p>
        <p className="hero-subtitle">✿ Customised goods, made just for you ✿</p>
        <div className="hero-buttons">
          <Link to="/products" className="btn-hero-main">Shop Now</Link>
          <Link to="/order" className="btn-hero-secondary">Order Form</Link>
        </div>
      </section>


      <section className="intro-section">
        <p className="intro-text">
          Welcome to <strong>Kiko's Studio</strong>, a tiny corner of happiness where we turn everyday items into something special ✧
        </p>
        <p className="intro-text">
          Each piece is hand-decorated and sealed with care using Mod Podge, so your items stay cute and glossy for a long, long time ♡
        </p>
      </section>


      <section className="featured-section">
        <h2 className="featured-title">✨ Some of Our Bestsellers ✨</h2>
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
            <p>Pay for your order and wait for your handmade piece to arrive! ✿</p>
          </div>
        </div>
        <Link to="/order" className="btn-order-now">Start Your Order</Link>
      </section>


      <section className="follow-section">
        <h2 className="follow-title">Stay Connected ✧</h2>
        <p className="follow-text">
          Follow us on Instagram and TikTok for behind-the-scenes peeks, new drops, and exclusive deals!
        </p>
        <div className="social-links">
          <a href="https://instagram.com/kiko.sstudio" target="_blank" rel="noopener noreferrer" className="social-link">
            📸 @kiko.sstudio
          </a>
          <a href="https://www.tiktok.com/@kiko.sstudio" target="_blank" rel="noopener noreferrer" className="social-link">
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


function NavBar({ showCart, setShowCart }) {
  const { getTotalItems } = useContext(CartContext);


  return (
    <nav className="sticky-nav">
      <Link to="/" className="nav-logo">Kiko's Studio</Link>
      <div className="nav-links">
        <Link to="/about" className="nav-link">About Us</Link>
        <Link to="/products" className="nav-link">Products</Link>
        <Link to="/order" className="nav-link">Order Form</Link>
      </div>
      <button 
        className="nav-cart-btn" 
        onClick={() => setShowCart(!showCart)}
      >
        <ShoppingCart size={24} />
        {getTotalItems() > 0 && (
          <span className="cart-badge">{getTotalItems()}</span>
        )}
      </button>
    </nav>
  );
}


function AppContent() {
  const [showCart, setShowCart] = React.useState(false);
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useContext(CartContext);


  return (
    <div className="shop-container">
      <NavBar showCart={showCart} setShowCart={setShowCart} />


<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/products" element={<Products />} />
  <Route path="/order" element={<Order showCart={showCart} />} />
</Routes>



      {/* Cart Sidebar */}
      {showCart && (
        <>
          <div className="cart-overlay" onClick={() => setShowCart(false)} />
          <div className="cart-sidebar">
            <div className="cart-header">
              <h3>Shopping Cart</h3>
              <button onClick={() => setShowCart(false)} className="close-cart">×</button>
            </div>


            <div className="cart-items">
              {cart.length === 0 ? (
                <p className="empty-cart-msg">Your cart is empty</p>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="cart-item">
                    {/* Handle custom orders */}
                    {item.type === 'custom-order' ? (
                      <>
                        <div className="cart-item-details">
                          <h4>Custom Order</h4>
                          <p className="custom-order-summary">
                            {item.items.tinBox > 0 && `Tin Box ×${item.items.tinBox} `}
                            {item.items.pencilCase > 0 && `Pencil Case ×${item.items.pencilCase} `}
                            {item.items.notebook > 0 && `Notebook ×${item.items.notebook}`}
                          </p>
                          <p className="custom-order-details">
                            {item.customization.theme} • {item.customization.colourScheme}
                          </p>
                          <p className="custom-order-price">
                            ${item.price.min}–${item.price.max}
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Handle regular products */}
                        {item.image && <img src={item.image} alt={item.name} className="cart-item-img" />}
                        <div className="cart-item-details">
                          <h4>{item.name}</h4>
                          <p>${item.price.toFixed(2)}</p>
                          <div className="quantity-controls">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                          </div>
                        </div>
                      </>
                    )}
                    
                    <button 
                      className="remove-item"
                      onClick={() => removeFromCart(item.id)}
                    >
                      ×
                    </button>
                  </div>
                ))
              )}
            </div>


            {cart.length > 0 && (
              <div className="cart-footer">
                <div className="cart-total">
                  <span>Total:</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <button className="checkout-btn">Proceed to Checkout</button>
              </div>
            )}
          </div>
        </>
      )}


      <footer className="modern-footer">
        <p>© 2025 Kiko's Studio — Handmade with Love ♡</p>
        <a href="https://instagram.com/kiko.sstudio" target="_blank" rel="noopener noreferrer" className="footer-link">
          <Instagram size={18} className="inline-icon" /> @kiko.sstudio
        </a>
      </footer>
    </div>
  );
}


export default function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <AppContent />
      </Router>
    </CartProvider>
  );
}
