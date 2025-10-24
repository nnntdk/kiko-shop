import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Products() {
  const products = [
    {
      name: 'Decorated Tin Box',
      price: '$8-12',
      description: 'Customizable tin boxes decorated with your choice of cute stickers',
      images: ['/tin-box-1.jpg', '/tin-box-2.jpg', '/tin-box-3.jpg', '/tin-box-4.jpg']
    },
    {
      name: 'Muji Pencil Case',
      price: '$12-15',
      description: 'Personalized Muji pencil cases with kawaii decoration',
      images: ['/pencil-case-1.jpg', '/pencil-case-2.jpg']
    },
    {
      name: 'Muji Notebook',
      price: '$12-15',
      description: 'Custom decorated Muji notebooks perfect for journaling',
      images: ['/notebook-1.jpg', '/notebook-2.jpg', '/notebook-3.jpg']
    }
  ];

  return (
    <section className="products-section">
      <h2 className="section-heading">Our Products 🎁</h2>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.name} className="product-card-modern">
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={10}
              slidesPerView={1}
              className="product-carousel-modern"
            >
              {product.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img src={image} alt={`${product.name} - ${index + 1}`} className="carousel-image" />
                </SwiperSlide>
              ))}
            </Swiper>
            <h3 className="product-title-modern">{product.name}</h3>
            <p className="product-price-modern">{product.price}</p>
            <p className="product-desc-modern">{product.description}</p>
          </div>
        ))}
      </div>

      {/* How It Works */}
      <section className="how-section">
        <h2 className="section-heading-white">How to Get Your Kiko's Goodies (♡˙︶˙♡)</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">Step 1</div>
            <p>Fill in the Order Form below with your details and custom requests ♡</p>
          </div>
          <div className="step-card">
            <div className="step-number">Step 2</div>
            <p>
              Drop us a DM on Instagram{' '}
              <a 
                href="https://instagram.com/kiko.sstudio" 
                target="_blank" 
                rel="noopener noreferrer"
                className="instagram-link-step"
              >
                @kiko.sstudio
              </a>
              {' '}to confirm your order ✧
            </p>
          </div>
          <div className="step-card">
            <div className="step-number">Step 3</div>
            <p>Make payment and sit tight — your handmade order will be on its way soon! ✿</p>
          </div>
        </div>
        
        {/* Order Now Button */}
        <div style={{textAlign: 'center', marginTop: '2rem'}}>
          <Link to="/order" className="btn-order-now">Order Now</Link>
        </div>
      </section>
    </section>
  );
}
