import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';
import './styles/product-list.css'
function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('🔍 ProductList useEffect triggered');
    
    const loadProducts = async () => {
      try {
        console.log('🚀 Starting to fetch products...');
        const data = await fetchProducts();
        console.log('🎯 Products data in component:', data);
        
        if (data && data.length > 0) {
          setProducts(data);
          console.log(`✅ ${data.length} products loaded successfully`);
        } else {
          console.warn('⚠️ No products received or empty array');
          setProducts([]);
        }
        
      } catch (err) {
        console.error('💥 Error loading products:', err);
        setError(err.message);
        setProducts([]);  // Assure un tableau vide en cas d'erreur
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div>Chargement des produits...</div>
        <div style={{ fontSize: '12px', color: '#666' }}>
          (Vérifiez la console pour les logs)
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        <h3>Erreur de chargement</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          Réessayer
        </button>
      </div>
    );
  }

  console.log('🎨 Rendering ProductList with products:', products);

  if (products.length === 0) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>Aucun produit disponible pour le moment.</p>
        <p style={{ fontSize: '12px', color: '#666' }}>
          (L'API a retourné un tableau vide)
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2>Nos Produits ({products.length})</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {products.map(product => (
          <div 
            key={product.id} 
            style={{
              border: '1px solid #ddd',
              padding: '15px',
              borderRadius: '8px',
              width: '250px'
            }}
          >
            <h3>{product.name}</h3>
            <p>Prix: {product.price} €</p>
            <p>Stock: {product.stock}</p>
            <p>Catégorie: {product.category}</p>
            <button>Voir détails</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;