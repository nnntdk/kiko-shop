import React, { useState, useContext } from 'react';
import { CartContext } from '../CartContext';
import CustomOrderForm from './CustomOrderForm';
import ReadyMadeShop from './ReadyMadeShop';
import '../styles/Order.css';

export default function Order() {
  const [activeTab, setActiveTab] = useState('custom');
  const { cart, removeFromCart, updateQuantity, getTotalPrice, addToCart } = useContext(CartContext);

  return (
    <div className="order-page">
      <div className="order-header">
        <h1 className="order-title">Order</h1>
      </div>

      <div className="order-container">
        <div className="order-main">
          <div className="order-tabs">
            <button
              className={`tab-btn ${activeTab === 'custom' ? 'active' : ''}`}
              onClick={() => setActiveTab('custom')}
            >
              Customised Orders
            </button>
            <button
              className={`tab-btn ${activeTab === 'readymade' ? 'active' : ''}`}
              onClick={() => setActiveTab('readymade')}
            >
              Ready-Made Products
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'custom' ? (
              <CustomOrderForm />
            ) : (
              <ReadyMadeShop 
                addToCart={addToCart}
                cart={cart}
              />
            )}
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <aside className="order-summary-sidebar">
          <div className="sidebar-header">
            <h2>Order Summary</h2>
          </div>

          <div className="sidebar-items">
            {cart.length > 0 ? (
              cart.map(item => (
                <div key={item.id} className="sidebar-item">
                  <div className="sidebar-item-header">
                    <h3 className="sidebar-item-name">
                      {item.type === 'custom-order' ? 'Custom Order' : item.name}
                    </h3>
                    <span className="sidebar-item-price">
                      {item.type === 'custom-order' ? `$${item.price.min}–$${item.price.max}` : `$${item.price.toFixed(2)}`}
                    </span>
                  </div>

                  {item.type === 'custom-order' ? (
                    <div className="sidebar-item-details">
                      <p className="custom-summary">
                        {item.items.tinBox > 0 && `Tin Box ×${item.items.tinBox} `}
                        {item.items.pencilCase > 0 && `Pencil Case ×${item.items.pencilCase} `}
                        {item.items.notebook > 0 && `Notebook ×${item.items.notebook}`}
                      </p>
                      <p className="custom-theme">{item.customization.theme} • {item.customization.colourScheme}</p>
                    </div>
                  ) : (
                    <div className="sidebar-item-details">
                      <div className="sidebar-quantity">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="qty-btn"
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="qty-btn"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}

                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="sidebar-remove-btn"
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <p className="empty-sidebar">Your cart is empty</p>
            )}
          </div>

          {cart.length > 0 && (
            <div className="sidebar-footer">
              <div className="sidebar-total">
                <span>Total</span>
                <span className="total-price">${getTotalPrice().toFixed(2)}</span>
              </div>
              <a href="/#/checkout" className="checkout-btn-sidebar">
                Proceed to Checkout
              </a>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
