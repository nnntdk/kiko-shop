import React from 'react';
// REMOVE THIS LINE: import logo from '/logo.jpg';

export default function About() {
  return (
    <div className="about-page">
      {/* Header Section */}
      <section className="about-header">
        <h1 className="about-title">✿ About Kiko's Studio ✿</h1>
        <p className="about-subtitle">A little corner of joy — where imagination meets handmade charm ♡</p>
      </section>

      {/* Our Story */}
      <section className="about-section">
        <h2 className="about-section-title">Our Story</h2>
        <div className="about-content">
          <p>
            Kiko's Studio started from a love for cute things and the happiness of creating by hand.
          </p>
          <p>
            What began as a small hobby of decorating everyday items slowly grew into a studio where each product is crafted with care and sealed with a glossy layer of Mod Podge — making every piece unique and personal.
          </p>
          <p>
            Every sticker, every brush stroke, every sparkle is done with love (and a sprinkle of chaos energy ✧).
          </p>
        </div>
      </section>

      {/* Our Promise */}
      <section className="about-section promise-section">
        <h2 className="about-section-title">Our Promise</h2>
        <div className="about-content">
          <p>
            We believe that <strong>handmade items carry a little bit of heart</strong>.
          </p>
          <p>
            Each order is carefully decorated, sealed, and packed by hand — never rushed, always made with intention.
          </p>
          <p>
            Because to us, it's not just about cute things — it's about spreading warmth through every parcel ♡
          </p>
        </div>
      </section>

      {/* How We Create */}
      <section className="about-section create-section">
        <h2 className="about-section-title">How We Create</h2>
        <p className="create-intro">Every piece goes through a slow, loving process:</p>
        <div className="create-steps-row">
          <div className="create-step">
            <span className="step-icon">✿</span>
            <p>Design & decoration using our signature sticker layering style</p>
          </div>
          <div className="create-step">
            <span className="step-icon">✨</span>
            <p>Sealed with Mod Podge for that glossy finish</p>
          </div>
          <div className="create-step">
            <span className="step-icon">⏳</span>
            <p>Air-dried and cured for weeks for durability</p>
          </div>
          <div className="create-step">
            <span className="step-icon">📦</span>
            <p>Packed safely and shipped with care (and maybe a thank-you note!)</p>
          </div>
        </div>
      </section>

      {/* Our Little Community */}
      <section className="about-section community-section">
        <h2 className="about-section-title">Our Little Community</h2>
        <div className="about-content">
          <p>
            Kiko's Studio is more than just a shop — it's a tiny community of people who love handmade things, sparkly stickers, and slow-made joy ♡
          </p>
          <p style={{marginTop: '1.5rem', fontWeight: 600}}>Follow us for sneak peeks, restocks, and care tips:</p>
          <div className="community-links">
            <a href="https://instagram.com/kiko.sstudio" target="_blank" rel="noopener noreferrer" className="community-link">
              🩷 Instagram: @kiko.sstudio
            </a>
            <a href="https://www.tiktok.com/@kiko.sstudio" target="_blank" rel="noopener noreferrer" className="community-link">
              🎵 TikTok: @kiko.sstudio
            </a>
            <a href="https://t.me/kikosstudio" target="_blank" rel="noopener noreferrer" className="community-link">
              💬 Telegram: t.me/kikosstudio
            </a>
          </div>
        </div>
      </section>

      {/* Closing Line */}
      <section className="about-closing">
        <p className="closing-text">
          Thank you for supporting a small handmade dream — one sticker at a time (´｡• ᵕ •｡`) ♡
        </p>
      </section>
    </div>
  );
}
