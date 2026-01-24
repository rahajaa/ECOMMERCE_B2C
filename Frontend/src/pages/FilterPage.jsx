import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/filter.css';

const API_BASE_URL = 'http://10.96.131.99:9000/api';

function FilterPage({ onFilterChange }) {
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    priceMax: 1000000,
    search: ''
  });

  // 1. Charger les vraies catégories du Backend
  useEffect(() => {
    axios.get(`${API_BASE_URL}/categories/`)
      .then(res => setCategories(res.data))
      .catch(err => console.error("Erreur catégories:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // On construit l'URL de filtrage pour Django
    // Exemple: ?category__slug=electronique&search=iphone
    let query = `?search=${filters.search}`;
    if (filters.category) query += `&category__slug=${filters.category}`;
    
    // On envoie ces filtres au composant parent (ProductListPage)
    onFilterChange(query);
  };

  return (
    <div className="filter-page-container">
      <h2 className="filter-title">Recherche et Filtres Avancés</h2>

      <form className="filter-options" onSubmit={handleSubmit}>
        {/* FILTRE CATÉGORIE (DYNAMIQUE) */}
        <div className="filter-group">
          <label htmlFor="category">Catégorie</label>
          <select id="category" name="category" value={filters.category} onChange={handleChange}>
            <option value="">Toutes les catégories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.slug}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* FILTRE PRIX */}
        <div className="filter-group">
          <label htmlFor="priceMax">Prix Max : {Number(filters.priceMax).toLocaleString()} Ar</label>
          <input
            type="range"
            id="priceMax"
            name="priceMax"
            min="0"
            max="5000000"
            step="50000"
            value={filters.priceMax}
            onChange={handleChange}
          />
        </div>

        {/* RECHERCHE TEXTUELLE */}
        <div className="filter-group">
          <label htmlFor="search">Mots-clés</label>
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Ex: iPhone, Samsung..."
            value={filters.search}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="filter-submit">
          🔍 Appliquer les filtres
        </button>
      </form>
    </div>
  );
}

export default FilterPage;