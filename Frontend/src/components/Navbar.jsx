import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/navbar.css';

function Navbar() {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          <span>🛒</span>
          <h1>BeToo Shop</h1>
        </Link>

        <div className="nav-links">
          <Link to="/" className={isActive('/')}>Accueil</Link>
          <Link to="/products" className={isActive('/products')}>Produits</Link>
          <Link to="/cart" className={isActive('/cart')}>Panier</Link>
          <Link to="/about" className={isActive('/about')}>À propos</Link>
          <Link to="/contact" className={isActive('/contact')}>Contact</Link>
        </div>

        <div className="nav-actions">
          <div className="auth-buttons">
            <Link to="/login" className="btn-login">Connexion</Link>
            <Link to="/register" className="btn-register">Inscription</Link>
          </div>

          <Link to="/cart" className="cart-icon">
            🛒 <span className="cart-count">0</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
