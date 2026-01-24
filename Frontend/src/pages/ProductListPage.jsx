import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://10.96.131.99:9000/api/products/')
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : (res.data.results || []);
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError("Impossible de charger les produits.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ padding: '50px', textAlign: 'center' }}>Chargement...</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '20px' }}>Nos Produits</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {products.map(product => {
          const imageSrc = product.main_image 
            ? (product.main_image.startsWith('http') ? product.main_image : `http://10.96.131.99:9000${product.main_image}`)
            : 'https://placehold.co/300x200?text=Pas+d+image';

          return (
            <div key={product.id} className="product-card" style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden', transition: 'box-shadow 0.3s' }}>
              {/* Lien sur l'image et le titre */}
              <Link to={`/products/${product.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ width: '100%', height: '200px', background: '#f0f0f0', overflow: 'hidden' }}>
                  <img 
                    src={imageSrc} 
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>
                <div style={{ padding: '15px' }}>
                  <h3 style={{ margin: '10px 0', fontSize: '1.1rem' }}>{product.name}</h3>
                  <p style={{ color: '#666', fontSize: '0.9rem' }}>{product.category?.name}</p>
                  <p style={{ fontWeight: 'bold', color: '#007bff', fontSize: '1.2rem' }}>
                    {Number(product.price).toLocaleString()} Ar
                  </p>
                </div>
              </Link>
              <div style={{ padding: '0 15px 15px' }}>
                <button style={{ width: '100%', padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                  Ajouter au panier
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductListPage;