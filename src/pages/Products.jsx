import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import from assets folder
import tinBox1 from '../assets/tin-box-1.JPG';
import tinBox2 from '../assets/tin-box-2.JPG';
import tinBox3 from '../assets/tin-box-3.JPG';
import tinBox4 from '../assets/tin-box-4.JPG';
import pencilCase1 from '../assets/pencil-case-1.JPG';
import pencilCase2 from '../assets/pencil-case-2.JPG';
import notebook1 from '../assets/notebook-1.JPG';
import notebook2 from '../assets/notebook-2.JPG';
import notebook3 from '../assets/notebook-3.JPG';

export default function Products() {
  const products = [
    {
      name: 'Decorated Tin Box',
      price: '$8-12',
      description: 'Customizable tin boxes decorated with your choice of cute stickers',
      images: [tinBox1, tinBox2, tinBox3, tinBox4]
    },
    {
      name: 'Muji Pencil Case',
      price: '$12-15',
      description: 'Personalized Muji pencil cases with kawaii decoration',
      images: [pencilCase1, pencilCase2]
    },
    {
      name: 'Muji Notebook',
      price: '$12-15',
      description: 'Custom decorated Muji notebooks perfect for journaling',
      images: [notebook1, notebook2, notebook3]
    }
  ];

  return (
    <section className="products-section">
      <h2 className="section-heading">Our Products</h2>
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
        
        <div style={{textAlign: 'center', marginTop: '2rem'}}>
          <Link to="/order" className="btn-order-now">Order Now</Link>
        </div>
      </section>
    </section>
  );
}
