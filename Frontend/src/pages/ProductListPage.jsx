import React, { useState, useEffect } from 'react';

function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Simulation de l'API Django
    const fetchData = async () => {
      try {
        // En attendant l'API, on simule des données
        setTimeout(() => {
          setProducts([
            { id: 1, name: 'Ordinateur Portable Gaming', price: '250000 Ar', description: 'PC Gamer RTX 4060, 16GB RAM', category: 'Électronique' },
            { id: 2, name: 'iPhone 15 Pro', price: '1800000 Ar', description: '128GB, Titanium', category: 'Téléphonie' },
            { id: 3, name: 'Sony WH-1000XM5', price: '850000 Ar', description: 'Casque antibruit', category: 'Audio' },
            { id: 4, name: 'MacBook Air M2', price: '3200000 Ar', description: '13", 8GB, 256GB', category: 'Électronique' },
            { id: 5, name: 'Samsung S24 Ultra', price: '2200000 Ar', description: '512GB, S-Pen', category: 'Téléphonie' },
            { id: 6, name: 'Apple Watch Series 9', price: '1200000 Ar', description: 'GPS, 45mm', category: 'Wearables' },
          ]);
          
          setCategories(['Tous', 'Électronique', 'Téléphonie', 'Audio', 'Wearables']);
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.error('Erreur:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <h1 className="page-title">Nos Produits</h1>
        <div className="loading">Chargement des produits...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="page-title">Nos Produits</h1>
      
      {/* Filtres */}
      <div className="filters" style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {categories.map(category => (
          <button 
            key={category} 
            style={{ 
              padding: '0.5rem 1rem', 
              border: '1px solid #ddd', 
              borderRadius: '8px', 
              background: category === 'Tous' ? '#2563eb' : 'white',
              color: category === 'Tous' ? 'white' : '#333',
              cursor: 'pointer'
            }}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* Grille de produits */}
      {products.length === 0 ? (
        <div className="empty-state">
          <p>Aucun produit disponible pour le moment.</p>
        </div>
      ) : (
        <div className="product-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <div style={{ 
                width: '100%', 
                height: '200px', 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '2rem'
              }}>
                {product.name.charAt(0)}
              </div>
              <div className="product-info">
                <h3 className="product-title">{product.name}</h3>
                <p className="product-price">{product.price}</p>
                <p className="product-description">{product.description}</p>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginTop: '1rem'
                }}>
                  <span style={{ 
                    fontSize: '0.8rem', 
                    color: '#6b7280', 
                    background: '#f3f4f6',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px'
                  }}>
                    {product.category}
                  </span>
                  <button className="btn-add-to-cart">Ajouter</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductListPage;