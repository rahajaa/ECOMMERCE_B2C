import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Utilisation d'axios pour la cohérence avec le reste du projet
import '../styles/HomePage.css';

function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = 'http://10.96.131.99:9000';

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/products/?is_featured=true`);
        // DRF renvoie parfois les données dans .results si tu as une pagination
        const data = Array.isArray(response.data) ? response.data : response.data.results;
        setFeaturedProducts(data || []);
      } catch (error) {
        console.error("Erreur chargement produits vedettes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const handleAddToCart = async (e, variantId) => {
    e.preventDefault(); // Empêche le clic de rediriger vers la page détail
    try {
      if (!variantId) return alert("Aucune variante disponible");
      await axios.post(`${API_BASE_URL}/api/cart/add/`, {
        variant_id: variantId,
        quantity: 1
      });
      alert("Ajouté au panier !");
    } catch (err) {
      alert("Erreur lors de l'ajout au panier");
    }
  };

  return (
    <div className="home-container">
      <section className="hero">
        <h1>Bienvenue chez BeToo Shop</h1>
        <p>Découvrez nos produits high-tech au meilleur prix.</p>
        <Link to="/products" className="btn-hero">Voir les produits →</Link>
      </section>

      <section className="featured-products" style={{ padding: '40px 0' }}>
        <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '30px' }}>Produits Vedettes</h2>

        {loading ? (
          <p className="loading-message" style={{ textAlign: 'center' }}>Chargement...</p>
        ) : (
          <div className="product-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
            gap: '25px', 
            padding: '0 20px' 
          }}>
            {featuredProducts.map(product => {
              const imageSrc = product.main_image?.startsWith('http') 
                ? product.main_image 
                : `${API_BASE_URL}${product.main_image}`;

              return (
                <div key={product.id} className="product-card" style={{ 
                  background: '#fff', 
                  borderRadius: '15px', 
                  padding: '20px', 
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  transition: 'transform 0.3s ease'
                }}>
                  
                  {/* ZONE CLIQUABLE (IMAGE + TITRE) */}
                  <Link to={`/products/${product.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ 
                      height: '200px', 
                      width: '100%', 
                      marginBottom: '15px', 
                      background: '#f8f9fa', 
                      borderRadius: '10px', 
                      overflow: 'hidden' 
                    }}>
                      <img
                        src={imageSrc}
                        alt={product.name}
                        style={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'contain',
                            transition: 'transform 0.5s ease'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        onError={(e) => { e.target.src = 'https://placehold.co/300x200?text=Image+Introuvable'; }}
                      />
                    </div>

                    <div style={{ textAlign: 'center' }}>
                      {product.brand && <small style={{ color: '#6b7280', textTransform: 'uppercase', fontWeight: 'bold' }}>{product.brand.name}</small>}
                      <h3 style={{ fontSize: '1.2rem', margin: '10px 0', color: '#1f2937' }}>{product.name}</h3>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '15px' }}>
                        {product.discount_price ? (
                          <>
                            <span style={{ textDecoration: 'line-through', color: '#9ca3af', fontSize: '0.9rem' }}>{Number(product.price).toLocaleString()} Ar</span>
                            <span style={{ color: '#ef4444', fontWeight: 'bold', fontSize: '1.4rem' }}>{Number(product.discount_price).toLocaleString()} Ar</span>
                          </>
                        ) : (
                          <span style={{ fontWeight: 'bold', fontSize: '1.4rem', color: '#111827' }}>{Number(product.price).toLocaleString()} Ar</span>
                        )}
                      </div>
                    </div>
                  </Link>

                  {/* BOUTON PANIER (INDÉPENDANT DU LIEN) */}
                  <button 
                    className="btn-add-to-cart" 
                    onClick={(e) => handleAddToCart(e, product.variants?.[0]?.id)}
                    style={{ 
                      width: '100%', 
                      padding: '12px', 
                      background: '#2563eb', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '8px', 
                      fontWeight: 'bold', 
                      cursor: 'pointer' 
                    }}
                  >
                    Ajouter au panier
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

export default HomePage;