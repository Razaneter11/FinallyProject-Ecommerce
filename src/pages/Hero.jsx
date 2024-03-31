
import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <div className="hero-container">
      <img src="hero.png" alt="Hero Image"className="hero-image"/>
      <div className="hero-content">
        <h1>Welcome to Our E-Commerce Store</h1>
        <p>Discover amazing products and enjoy a seamless shopping experience.</p>
      </div>
    </div>
  );
};

export default Hero;
