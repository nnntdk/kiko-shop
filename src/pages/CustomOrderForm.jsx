import React, { useState, useContext } from 'react';
import SuccessModal from '../components/SuccessModal';
import { CartContext } from '../CartContext';
import '../styles/CustomOrderForm.css';

const PRICE_RANGES = {
  tinBoxQty: 8,
  mujiPencilCaseQty: 10,
  mujiNotebookQty: 6,
};

export default function CustomOrderForm() {
  const { addToCart } = useContext(CartContext);
  const [formData, setFormData] = useState({
    tinBoxQty: '',
    mujiPencilCaseQty: '',
    mujiNotebookQty: '',
    orientation: '',
    colourScheme: '',
    theme: '',
    inspoPics: '',
    words: '',
    wordPlacement: '',
    removeMujiLabel: '',
    budget: '',
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateEstimateCost = () => {
    const tinBoxCost = formData.tinBoxQty ? parseInt(formData.tinBoxQty) * PRICE_RANGES.tinBoxQty : 0;
    const pencilCaseCost = formData.mujiPencilCaseQty ? parseInt(formData.mujiPencilCaseQty) * PRICE_RANGES.mujiPencilCaseQty : 0;
    const notebookCost = formData.mujiNotebookQty ? parseInt(formData.mujiNotebookQty) * PRICE_RANGES.mujiNotebookQty : 0;
    
    const subtotal = tinBoxCost + pencilCaseCost + notebookCost;
    
    return {
      tinBox: tinBoxCost,
      pencilCase: pencilCaseCost,
      notebook: notebookCost,
      subtotal: subtotal,
      total: subtotal
    };
  };

  const hasItems = () => {
    return parseInt(formData.tinBoxQty) > 0 || 
           parseInt(formData.mujiPencilCaseQty) > 0 || 
           parseInt(formData.mujiNotebookQty) > 0;
  };

  const costs = calculateEstimateCost();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Form submitted:', formData);
    
    // Add to cart logic here
    const orderItem = {
      id: Date.now(),
      type: 'custom-order',
      name: 'Custom Order',
      items: {
        tinBox: parseInt(formData.tinBoxQty) || 0,
        pencilCase: parseInt(formData.mujiPencilCaseQty) || 0,
        notebook: parseInt(formData.mujiNotebookQty) || 0,
      },
      customization: {
        orientation: formData.orientation,
        colourScheme: formData.colourScheme,
        theme: formData.theme,
        inspoPics: formData.inspoPics,
        words: formData.words,
        wordPlacement: formData.wordPlacement,
        removeMujiLabel: formData.removeMujiLabel,
        budget: formData.budget,
      },
      price: costs.total,
      quantity: 1,
    };
    
    // Add to cart
    addToCart(orderItem);
    console.log('Adding to cart:', orderItem);
    
    setShowModal(true);
    
    setFormData({
      tinBoxQty: '',
      mujiPencilCaseQty: '',
      mujiNotebookQty: '',
      orientation: '',
      colourScheme: '',
      theme: '',
      inspoPics: '',
      words: '',
      wordPlacement: '',
      removeMujiLabel: '',
      budget: '',
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="custom-order-container">
      <form className="custom-order-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Order Template</h2>
        <p className="form-subtitle">(please fill up, ty ♡)</p>

        {/* Order Details Section */}
        <section className="form-section">
          <h3 className="section-header">Order Details</h3>
          
          <div className="form-group">
            <label htmlFor="mujiNotebookQty">
              Muji Notebook 
              <span className="price-range">($6 each)</span>
            </label>
            <input
              type="number"
              id="mujiNotebookQty"
              name="mujiNotebookQty"
              value={formData.mujiNotebookQty}
              onChange={handleChange}
              min="0"
              placeholder="0"
            />
          </div>

          <div className="form-group">
            <label htmlFor="tinBoxQty">
              Tin Box 
              <span className="price-range">($8 each)</span>
            </label>
            <input
              type="number"
              id="tinBoxQty"
              name="tinBoxQty"
              value={formData.tinBoxQty}
              onChange={handleChange}
              min="0"
              placeholder="0"
            />
          </div>

          <div className="form-group">
            <label htmlFor="mujiPencilCaseQty">
              Muji Pencil Case 
              <span className="price-range">($10 each)</span>
            </label>
            <input
              type="number"
              id="mujiPencilCaseQty"
              name="mujiPencilCaseQty"
              value={formData.mujiPencilCaseQty}
              onChange={handleChange}
              min="0"
              placeholder="0"
            />
          </div>

          <div className="form-group">
            <label htmlFor="orientation">Orientation</label>
            <select
              id="orientation"
              name="orientation"
              value={formData.orientation}
              onChange={handleChange}
              required
            >
              <option value="">Select orientation</option>
              <option value="horizontal">Horizontal</option>
              <option value="vertical">Vertical</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="colourScheme">Colour Scheme</label>
            <input
              type="text"
              id="colourScheme"
              name="colourScheme"
              value={formData.colourScheme}
              onChange={handleChange}
              required
              placeholder="e.g., purple, blue, pink, green, brown, red, etc."
            />
          </div>

          <div className="form-group">
            <label htmlFor="theme">Theme</label>
            <input
              type="text"
              id="theme"
              name="theme"
              value={formData.theme}
              onChange={handleChange}
              required
              placeholder="e.g., heisei, jumino, etc."
            />
          </div>

          <div className="form-group">
            <label htmlFor="inspoPics">Inspo Pics</label>
            <input
              type="text"
              id="inspoPics"
              name="inspoPics"
              value={formData.inspoPics}
              onChange={handleChange}
              placeholder="Pinterest board, links, etc."
            />
          </div>

          <div className="form-group">
            <label htmlFor="words">Any words/letter(s) you wanna include?</label>
            <textarea
              id="words"
              name="words"
              value={formData.words}
              onChange={handleChange}
              placeholder="Leave blank if none. (Additional charge may apply)"
              rows="3"
            />
          </div>

          <div className="form-group">
            <label htmlFor="wordPlacement">Placement & Case</label>
            <textarea
              id="wordPlacement"
              name="wordPlacement"
              value={formData.wordPlacement}
              onChange={handleChange}
              placeholder="Where should it be placed? Uppercase or lowercase?"
              rows="2"
            />
          </div>
        </section>

        {/* Extra Info Section */}
        <section className="form-section">
          <h3 className="section-header">Extra Info</h3>
          
          <div className="form-group">
            <label htmlFor="removeMujiLabel">For Muji Pencil Case: Remove the Muji label/sticker?</label>
            <select
              id="removeMujiLabel"
              name="removeMujiLabel"
              value={formData.removeMujiLabel}
              onChange={handleChange}
            >
              <option value="">Select...</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="budget">Any special requests or budget notes?</label>
            <textarea
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="Let me know if you have any special requests!"
              rows="2"
            />
          </div>
        </section>

        <button type="submit" className="submit-btn">Add to Cart</button>
      </form>

      {/* Order Summary Sidebar */}
      <aside className="order-summary">
        <h3 className="summary-title">Order Summary</h3>
        
        {hasItems() ? (
          <>
            <div className="summary-items">
              {parseInt(formData.tinBoxQty) > 0 && (
                <div className="summary-item">
                  <span className="item-name">Tin Box × {formData.tinBoxQty}</span>
                  <span className="item-price">${costs.tinBox}</span>
                </div>
              )}
              
              {parseInt(formData.mujiPencilCaseQty) > 0 && (
                <div className="summary-item">
                  <span className="item-name">Muji Pencil Case × {formData.mujiPencilCaseQty}</span>
                  <span className="item-price">${costs.pencilCase}</span>
                </div>
              )}
              
              {parseInt(formData.mujiNotebookQty) > 0 && (
                <div className="summary-item">
                  <span className="item-name">Muji Notebook × {formData.mujiNotebookQty}</span>
                  <span className="item-price">${costs.notebook}</span>
                </div>
              )}
            </div>

            <div className="summary-divider"></div>

            <div className="summary-total">
              <span className="total-label">Estimated Total</span>
              <span className="total-price">${costs.total}</span>
            </div>

            <p className="price-note">
              *Final price calculated at checkout (includes delivery & processing)
            </p>
          </>
        ) : (
          <p className="empty-summary">Add items to see your order summary</p>
        )}
      </aside>

      <SuccessModal isOpen={showModal} onClose={handleCloseModal} />
    </div>
  );
}
