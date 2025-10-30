// ReadyMadeShop.jsx
import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function ReadyMadeShop({ addToCart, cart }) {
  // Sample products - you can fetch these from Supabase later
  const products = [
    {
      id: 1,
      name: 'Kawaii Sticker Sheet',
      price: 5.00,
      image: '/images/sticker-sheet-1.jpg',
      description: 'Cute kawaii-themed sticker sheet with 20+ stickers',
      stock: 10
    },
    {
      id: 2,
      name: 'DIY Decoration Kit',
      price: 15.00,
      image: '/images/diy-kit-1.jpg',
      description: 'Complete DIY kit with stickers, decorative tape, and more',
      stock: 5
    },
    {
      id: 3,
      name: 'Heisei Theme Sticker Sheet',
      price: 5.00,
      image: '/images/sticker-sheet-2.jpg',
      description: 'Nostalgic heisei-era themed stickers',
      stock: 8
    },
    {
      id: 4,
      name: 'Premium DIY Kit',
      price: 25.00,
      image: '/images/diy-kit-2.jpg',
      description: 'Deluxe kit with premium materials and exclusive stickers',
      stock: 3
    }
  ];

  const isInCart = (productId) => {
    return cart.some(item => item.id === productId);
  };

  return (
    <div className="ready-made-shop">
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <img src={product.image} alt={product.name} />
              {product.stock < 5 && (
                <span className="low-stock-badge">Only {product.stock} left!</span>
              )}
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <div className="product-footer">
                <span className="product-price">${product.price.toFixed(2)}</span>
                <button 
                  className={`add-to-cart-btn ${isInCart(product.id) ? 'in-cart' : ''}`}
                  onClick={() => addToCart(product)}
                  disabled={product.stock === 0}
                >
                  {product.stock === 0 ? 'Out of Stock' : 
                   isInCart(product.id) ? 'Added ✓' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
