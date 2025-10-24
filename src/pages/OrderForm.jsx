import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function OrderForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    products: [],
    orientation: '',
    colorScheme: '',
    theme: '',
    inspoPics: '',
    words: '',
    delivery: '',
    address: '',
    removeLabel: false,
    onBudget: '',
    additionalComments: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const products = [
    { name: 'Tin Box', priceRange: '$8–$12'},
    { name: 'Muji Pencil Case', priceRange: '$10–$15' },
    { name: 'Muji Notebook', priceRange: '$10–$15' }
  ];

  const handleProductChange = (productName) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products.includes(productName)
        ? prev.products.filter(p => p !== productName)
        : [...prev.products, productName]
    }));
  };

  const calculatePriceRange = () => {
    if (formData.products.length === 0) return '$0';
    
    let minTotal = 0;
    let maxTotal = 0;
    
    formData.products.forEach(productName => {
      if (productName === 'Tin Box') {
        minTotal += 8;
        maxTotal += 12;
      } else {
        minTotal += 10;
        maxTotal += 15;
      }
    });
    
    // Add delivery cost
    if (formData.delivery === 'meetup') {
      minTotal += 1;
      maxTotal += 2;
    } else if (formData.delivery === 'mailing') {
      minTotal += 3;
      maxTotal += 3;
    }
    
    return minTotal === maxTotal ? `$${minTotal}` : `$${minTotal}–$${maxTotal}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from('orders').insert([{
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        products: formData.products,
        orientation: formData.orientation,
        color_scheme: formData.colorScheme,
        theme: formData.theme,
        inspo_pics: formData.inspoPics,
        words: formData.words,
        delivery: formData.delivery,
        address: formData.address,
        remove_label: formData.removeLabel,
        on_budget: formData.onBudget,
        additional_comments: formData.additionalComments,
        estimated_range: calculatePriceRange()
      }]);
      if (error) throw error;
      setSubmitted(true);
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting order. Please try again!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Order Form</h1>
      
      {submitted && (
        <div className="success-box">
          <h3>Order Submitted!</h3>
          <p>Please DM me on Instagram <a href="https://instagram.com/kiko.sstudio" target="_blank" rel="noopener noreferrer">@kiko.sstudio</a> to confirm and make payment!</p>
        </div>
      )}

      <div className="checkout-layout">
        {/* Left Column - Customer Info */}
        <div className="checkout-left">
          <form onSubmit={handleSubmit}>
            {/* Customer Info */}
            <section className="checkout-section">
              <h3 className="section-title-checkout">Customer info</h3>
              
              <div className="form-group">
                <input
                  type="text"
                  className="checkout-input"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  placeholder="Your Name *"
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  className="checkout-input"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="Email"
                />
              </div>

              <div className="form-group">
                <input
                  type="tel"
                  className="checkout-input"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="Phone"
                />
              </div>
            </section>

            {/* Order Details */}
            <section className="checkout-section">
              <h3 className="section-title-checkout">Order Details</h3>
              
              <div className="form-group">
                <label className="checkout-label">Product(s) *</label>
                {products.map(product => (
                  <div key={product.name} className="checkbox-item">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      checked={formData.products.includes(product.name)}
                      onChange={() => handleProductChange(product.name)}
                    />
                    <label>{product.emoji} {product.name} ({product.priceRange})</label>
                  </div>
                ))}
              </div>

              <div className="form-group">
                <select
                  className="checkout-input"
                  value={formData.orientation}
                  onChange={(e) => setFormData({...formData, orientation: e.target.value})}
                >
                  <option value="">Orientation</option>
                  <option value="horizontal">Horizontal</option>
                  <option value="vertical">Vertical</option>
                </select>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  className="checkout-input"
                  value={formData.colorScheme}
                  onChange={(e) => setFormData({...formData, colorScheme: e.target.value})}
                  placeholder="Color Scheme (e.g., purple, blue, pink)"
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  className="checkout-input"
                  value={formData.theme}
                  onChange={(e) => setFormData({...formData, theme: e.target.value})}
                  placeholder="Theme (e.g., heisei, jumino)"
                />
              </div>

              <div className="form-group">
                <textarea
                  className="checkout-textarea"
                  value={formData.inspoPics}
                  onChange={(e) => setFormData({...formData, inspoPics: e.target.value})}
                  placeholder="Inspo Pics (Pinterest links, etc.)"
                  rows="3"
                />
              </div>

              <div className="form-group">
                <textarea
                  className="checkout-textarea"
                  value={formData.words}
                  onChange={(e) => setFormData({...formData, words: e.target.value})}
                  placeholder="Any words/letters to include? (additional charge may apply)"
                  rows="3"
                />
              </div>
            </section>

            {/* Delivery */}
            <section className="checkout-section">
              <h3 className="section-title-checkout">📦 Delivery Options</h3>
              
              <div className="form-group">
                <select
                  className="checkout-input"
                  value={formData.delivery}
                  onChange={(e) => setFormData({...formData, delivery: e.target.value})}
                >
                  <option value="">Select delivery method</option>
                  <option value="meetup">Meet-ups: +$1–$2 (depends on distance)</option>
                  <option value="mailing">Tracked Mailing: +$3</option>
                </select>
              </div>

              {formData.delivery === 'mailing' && (
                <div className="form-group">
                  <textarea
                    className="checkout-textarea"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    placeholder="Mailing Address"
                    rows="2"
                  />
                </div>
              )}
            </section>

            {/* Extras */}
            <section className="checkout-section">
              <h3 className="section-title-checkout">Extra Options</h3>
              
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={formData.removeLabel}
                  onChange={(e) => setFormData({...formData, removeLabel: e.target.checked})}
                />
                <label>Remove Muji label/sticker? (for pencil case)</label>
              </div>

              <div className="form-group" style={{marginTop: '1rem'}}>
                <label className="checkout-label">Are you on a budget?</label>
                <select
                  className="checkout-input"
                  value={formData.onBudget}
                  onChange={(e) => setFormData({...formData, onBudget: e.target.value})}
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div className="form-group">
                <textarea
                  className="checkout-textarea"
                  value={formData.additionalComments}
                  onChange={(e) => setFormData({...formData, additionalComments: e.target.value})}
                  placeholder="Additional Comments"
                  rows="3"
                />
              </div>
            </section>
          </form>
        </div>

        {/* Right Column - Order Summary */}
        <div className="checkout-right">
          <div className="order-summary-box">
            <div className="order-summary-header">
              <h3>Order Summary</h3>
            </div>

            <div className="order-items">
              {formData.products.length === 0 ? (
                <p className="empty-cart">No products selected</p>
              ) : (
                <>
                  {formData.products.map((productName, index) => {
                    const product = products.find(p => p.name === productName);
                    return (
                      <div key={index} className="order-item">
                        <div className="item-info">
                          <span className="item-emoji">{product?.emoji}</span>
                          <span className="item-name">{productName}</span>
                        </div>
                        <span className="item-price">{product?.priceRange}</span>
                      </div>
                    );
                  })}
                  
                  {formData.delivery && (
                    <div className="order-item">
                      <div className="item-info">
                        <span className="item-emoji">📦</span>
                        <span className="item-name">
                          {formData.delivery === 'meetup' ? 'Meet-up' : 'Tracked Mailing'}
                        </span>
                      </div>
                      <span className="item-price">
                        {formData.delivery === 'meetup' ? '+$1–$2' : '+$3'}
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="order-summary-footer">
              <div className="summary-row total-row">
                <span><strong>Estimated Total</strong></span>
                <span><strong>{calculatePriceRange()}</strong></span>
              </div>
              <p className="price-note">*Final price depends on design complexity</p>
            </div>

            <button 
              type="submit" 
              className="proceed-btn" 
              onClick={handleSubmit}
              disabled={loading || formData.products.length === 0}
            >
              {loading ? 'Submitting...' : 'PROCEED TO ORDER'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
