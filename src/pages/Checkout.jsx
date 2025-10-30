import React, { useState, useContext } from 'react';
import { CartContext } from '../CartContext';
import { supabase } from '../supabaseClient';
import SuccessModal from "../components/SuccessModal";
import '../styles/Checkout.css';

export default function Checkout() {
  const { cart, getTotalPrice, clearCart } = useContext(CartContext);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    delivery: '',
    deliveryLocation: '',
    paymentMethod: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);

    try {
      const deliveryFee = formData.delivery === 'mailing-local' ? 3 : 
                          formData.delivery === 'mailing-intl' ? 15 : 
                          formData.delivery === 'meetup' ? 2 : 0;

      const orderData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        delivery: formData.delivery,
        delivery_location: formData.delivery === 'meetup' ? formData.deliveryLocation : null,
        payment_method: formData.paymentMethod,
        order_details: JSON.stringify(cart),
        total_price: getTotalPrice() + deliveryFee,
        status: 'pending',
        created_at: new Date().toISOString(),
      };

      const { data, error: insertError } = await supabase
        .from('orders')
        .insert([orderData])
        .select();

      if (insertError) throw insertError;

      clearCart();
      setFormData({
        name: '',
        email: '',
        phone: '',
        delivery: '',
        deliveryLocation: '',
        paymentMethod: '',
      });

      // Show the success modal instead of redirecting
      setShowSuccessModal(true);

    } catch (err) {
      console.error('Error placing order:', err);
      setError(err.message || 'Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    // Optionally redirect after closing the modal
    // window.location.href = '/';
  };

  const deliveryFee = formData.delivery === 'mailing-local' ? 3 : 
                      formData.delivery === 'mailing-intl' ? 15 : 
                      formData.delivery === 'meetup' ? 2 : 0;

  const subtotal = getTotalPrice();
  const total = subtotal + deliveryFee;

  return (
    <>
      <SuccessModal isOpen={showSuccessModal} onClose={handleModalClose} />
      
      <div className="checkout-wrapper">
        <div className="checkout-container">
          <h1 className="checkout-title">Order Summary</h1>

          {/* Rest of your checkout form remains the same */}
          <div className="checkout-content">
            {/* Left: Order Review */}
            <div className="order-review-section">
              {/* Your existing code */}
            </div>

            {/* Right: Checkout Form */}
            <div className="checkout-form-section">
              <h2 className="section-title">Delivery & Payment</h2>

              {error && <div className="error-alert">{error}</div>}

              <form onSubmit={handleSubmit} className="checkout-form">
                {/* Your existing form code */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
