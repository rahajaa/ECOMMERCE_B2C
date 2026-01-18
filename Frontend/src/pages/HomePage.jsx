import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulation de données (remplaçable par API Django)
    setTimeout(() => {
      setFeaturedProducts([
        {
          id: 1,
          name: 'Ordinateur Portable',
          price: 150000,
          image: 'https://via.placeholder.com/300x200/3b82f6/ffffff?text=PC+Gamer'
        },
        {
          id: 2,
          name: 'Smartphone',
          price: 80000,
          image: 'https://via.placeholder.com/300x200/10b981/ffffff?text=Smartphone'
        },
        {
          id: 3,
          name: 'Casque Audio',
          price: 35000,
          image: 'https://via.placeholder.com/300x200/8b5cf6/ffffff?text=Casque'
        },
        {
          id: 4,
          name: 'Montre Connectée',
          price: 45000,
          image: 'https://via.placeholder.com/300x200/ef4444/ffffff?text=Montre'
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="home-container">
      {/* HERO */}
      <section className="hero">
        <h1>Bienvenue chez BeToo Shop</h1>
        <p>
          Découvrez nos produits high-tech au meilleur prix.
          Livraison rapide dans toute l’île.
        </p>
        <Link to="/products" className="btn-hero">
          Voir les produits →
        </Link>
      </section>

      {/* PRODUITS VEDETTES */}
      <section className="featured-products">
        <h2 className="section-title">Produits Vedettes</h2>

        {loading ? (
          <p className="loading-message">Chargement des produits...</p>
        ) : (
          <div className="product-grid">
            {featuredProducts.map(product => (
              <div key={product.id} className="product-card">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="product-price">
                    {product.price.toLocaleString()} Ar
                  </p>
                  <button className="btn-add-to-cart">
                    Ajouter au panier
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* AVANTAGES */}
      <section className="features">
        <div className="feature-card">
          <span className="feature-icon">🚚</span>
          <h3>Livraison Rapide</h3>
          <p>Livraison sous 24h dans toute la région</p>
        </div>

        <div className="feature-card">
          <span className="feature-icon">🛡️</span>
          <h3>Garantie 1 an</h3>
          <p>Tous nos produits sont garantis</p>
        </div>

        <div className="feature-card">
          <span className="feature-icon">💳</span>
          <h3>Paiement Sécurisé</h3>
          <p>Paiement en ligne 100% sécurisé</p>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
