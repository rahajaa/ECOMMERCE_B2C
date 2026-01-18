import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
//import '../styles/ProductQuickView.css';

// URL de base de votre API Django
// Il est préférable de la rendre configurable via des variables d'environnement Vite
// pour faciliter le déploiement (ex: import.meta.env.VITE_API_BASE_URL)
// Pour le développement, l'URL en dur est acceptable.
const YOUR_API_BASE_URL = 'http://127.0.0.1:8000/api';

function ProductQuickView({ productSlug, onClose }) {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Utilisez useCallback pour memoizer la fonction et éviter des recréations inutiles
    // Ce n'est pas strictement nécessaire ici mais une bonne pratique pour les fonctions dépendantes de props/state
    const fetchProductDetails = useCallback(async () => {
        // Si productSlug est null ou vide, on ne fait pas d'appel API et on réinitialise l'état
        if (!productSlug) {
            setProduct(null);
            setLoading(false);
            setError(null); // Réinitialiser l'erreur quand il n'y a pas de slug
            return;
        }

        try {
            setLoading(true);
            setError(null); // Réinitialiser l'erreur avant un nouvel appel
            // Construisez l'URL de manière plus robuste.
            // Assurez-vous que votre endpoint Django est bien '/api/products/<slug>/'
            // Le '/' final est souvent important pour DRF.
            const response = await fetch(`${YOUR_API_BASE_URL}/products/${productSlug}/`);

            if (!response.ok) {
                // Tente de lire le message d'erreur du backend si disponible
                const errorData = await response.json().catch(() => ({ message: 'Erreur inconnue' }));
                throw new Error(`HTTP error! status: ${response.status} - ${errorData.detail || errorData.message || 'Erreur du serveur.'}`);
            }

            const data = await response.json();
            setProduct(data);
        } catch (err) { // Renommez 'error' en 'err' pour éviter la confusion avec l'état 'error'
            console.error(`Erreur lors de la récupération des détails du produit "${productSlug}":`, err);
            // Utilisez le message d'erreur de l'objet Error si disponible
            setError(`Impossible de charger les détails du produit. ${err.message || 'Veuillez réessayer.'}`);
        } finally {
            setLoading(false);
        }
    }, [productSlug]); // Dépend de productSlug uniquement

    useEffect(() => {
        fetchProductDetails();
    }, [fetchProductDetails]); // Dépend de fetchProductDetails (qui est useCallback-ed)

    // Affiche le composant seulement si un productSlug est fourni (et donc la quick view est "ouverte")
    if (!productSlug) {
        return null;
    }

    // Le reste de votre logique de rendu est déjà très bien structurée.
    // L'ordre des vérifications (loading, error, !product) est logique.

    if (loading) {
        return (
            <div className="product-quick-view-overlay" onClick={onClose}>
                <div className="product-quick-view-sidebar" onClick={e => e.stopPropagation()}>
                    <button className="quick-view-close-btn" onClick={onClose}>&times;</button>
                    <p className="loading-message">Chargement des détails du produit...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="product-quick-view-overlay" onClick={onClose}>
                <div className="product-quick-view-sidebar" onClick={e => e.stopPropagation()}>
                    <button className="quick-view-close-btn" onClick={onClose}>&times;</button>
                    <p className="error-message">{error}</p>
                    {/* Optionnel: un bouton pour réessayer */}
                    <button className="retry-btn" onClick={fetchProductDetails}>Réessayer</button>
                </div>
            </div>
        );
    }

    // Ce cas devrait être rare si productSlug est fourni et qu'il n'y a ni loading ni error,
    // mais il sert de fallback si l'API retourne un 200 mais avec un corps vide/null.
    if (!product) {
        return (
            <div className="product-quick-view-overlay" onClick={onClose}>
                <div className="product-quick-view-sidebar" onClick={e => e.stopPropagation()}>
                    <button className="quick-view-close-btn" onClick={onClose}>&times;</button>
                    <p className="no-product-found">Produit introuvable ou détails non disponibles.</p>
                </div>
            </div>
        );
    }

    const handleViewDetails = () => {
        onClose(); // Ferme la quick view
        navigate(`/products/${product.slug}`); // Navigue vers la page de détails complète
    };

    // Le rendu final du produit
    return (
        <div className="product-quick-view-overlay" onClick={onClose}>
            <div className="product-quick-view-sidebar" onClick={e => e.stopPropagation()}>
                <button className="quick-view-close-btn" onClick={onClose}>
                    &times;
                </button>
                <div className="quick-view-header">
                    <h2>{product.name}</h2>
                </div>
                <div className="quick-view-body">
                    {/* Utilise product.image_url pour correspondre au snake_case de Django REST Framework par défaut */}
                    <img
                        src={product.image_url || 'https://placehold.co/400x300/cccccc/ffffff?text=Image+Produit'}
                        alt={product.name}
                        className="quick-view-image"
                    />
                    <p className="quick-view-description">{product.description || 'Pas de description détaillée.'}</p>
                    <div className="quick-view-price">{product.price || 'N/A'} Ar</div>
                    {/* Assurez-vous que votre API renvoie un champ 'stock' */}
                    {typeof product.stock === 'number' ? (
                        product.stock > 0 ? (
                            <div className="quick-view-stock available">En stock ({product.stock})</div>
                        ) : (
                            <div className="quick-view-stock out-of-stock">Hors stock</div>
                        )
                    ) : (
                        <div className="quick-view-stock">Stock inconnu</div>
                    )}
                    <ul className="quick-view-details-list">
                        {/* Assurez-vous que product.details est un tableau (ex: ['detail 1', 'detail 2'])
                            Si votre API Django renvoie un champ nommé 'features' ou 'caracteristiques' qui est un tableau,
                            ajustez 'product.details' à 'product.features' ou 'product.caracteristiques'
                        */}
                        {product.details && Array.isArray(product.details) && product.details.length > 0 ? (
                            product.details.map((detail, index) => (
                                <li key={index}>{detail}</li>
                            ))
                        ) : (
                            <li>Aucun détail supplémentaire disponible.</li>
                        )}
                    </ul>
                </div>
                <div className="quick-view-actions">
                    <button className="add-to-cart-btn">Ajouter au panier</button>
                    <button className="view-details-btn" onClick={handleViewDetails}>Voir les détails complets</button>
                </div>
            </div>
        </div>
    );
}

export default ProductQuickView;