import React from 'react';
import '../styles/SuccessModal.css';

export default function SuccessModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="success-modal">
        <div className="success-content">
          <h2>Order Submitted!</h2>
          <p>Please DM me on Instagram <a href="https://instagram.com/kiko.sstudio" target="_blank" rel="noopener noreferrer">@kiko.sstudio</a> to confirm and make payment!</p>
          <button className="modal-close-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </>
  );
}
