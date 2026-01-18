// src/pages/FilterPage.jsx
import React from 'react';
import '../styles/filter.css';

function FilterPage() {
  return (
    <div className="filter-page-container">
      <h2 className="filter-title">Recherche et Filtres Avancés</h2>
      <p className="filter-intro">
        Utilisez les options ci-dessous pour affiner votre recherche de produits ou services.
      </p>

      <div className="filter-options">
        <div className="filter-group">
          <label htmlFor="category">Catégorie</label>
          <select id="category" name="category">
            <option value="">Toutes les catégories</option>
            <option value="electronique">Électronique</option>
            <option value="mode">Mode</option>
            <option value="services-web">Services Web</option>
            <option value="maison">Maison</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="priceRange">Fourchette de Prix</label>
          <input
            type="range"
            id="priceRange"
            name="priceRange"
            min="0"
            max="1000000"
            step="10000"
            className="price-range"
          />
          <div className="price-hint">Prix max : 1 000 000 Ar</div>
        </div>

        <div className="filter-group">
          <label htmlFor="keywords">Mots-clés</label>
          <input
            type="text"
            id="keywords"
            name="keywords"
            placeholder="Rechercher par mot-clé..."
          />
        </div>

        <button className="filter-submit">
          Appliquer les filtres
        </button>
      </div>
    </div>
  );
}

export default FilterPage;
