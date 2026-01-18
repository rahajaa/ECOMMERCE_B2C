// src/pages/ProductDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/App.css'; // Assurez-vous d'importer votre CSS global

// URL de base de votre API Django
const YOUR_API_BASE_URL = 'http://127.0.0.1:8000/api';

function ProductDetailPage() {
    const { productSlug } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                setLoading(true);
                setError(null);
                // ATTENTION: La casse 'Products' doit être 'products' pour correspondre à votre URL Django
                const response = await fetch(`${YOUR_API_BASE_URL}/products/${productSlug}`); 
                if (!response.ok) {
                    // Si le produit n'existe pas, un 404 est une réponse normale
                    if (response.status === 404) {
                        setProduct(null); // S'assurer que le produit est null pour afficher "Produit non trouvé"
                        return; // Arrêter l'exécution de la fonction
                    }
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error(`Erreur lors de la récupération des détails du produit ${productSlug}:`, error);
                setError("Impossible de charger les détails du produit. Veuillez réessayer.");
            } finally {
                setLoading(false);
            }
        };

        if (productSlug) {
            fetchProductDetails();
        }
    }, [productSlug]);

    if (loading) {
        return (
            <div className="product-detail-page-wrapper">
                <p className="loading-message">Chargement des détails du produit...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="product-detail-page-wrapper">
                <p className="error-message">{error}</p>
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <Link to="/products" className="back-button">Retour aux produits</Link>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="product-detail-page-wrapper">
                <p className="no-product-found">Produit non trouvé.</p>
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <Link to="/products" className="back-button">Retour aux produits</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="product-detail-page-wrapper">
            <div className="product-detail-container">
                <div className="product-detail-image-gallery">
                    {/* Utilisez product.main_image_url car c'est ce que votre sérialiseur expose comme URL principale */}
                    <img src={product.main_image_url || 'https://placehold.co/600x400/cccccc/ffffff?text=Image+Produit'} alt={product.name} className="product-main-image" />
                    {/* Ajoutez ici une galerie si product.images contient plusieurs URLs d'images */}
                </div>
                <div className="product-detail-info">
                    <h1>{product.name}</h1>
                    {/* Accédez à product.category.name car 'category' est un objet imbriqué */}
                    <p className="product-category">Catégorie: {product.category ? product.category.name : 'Non spécifiée'}</p>
                    <p className="product-description-full">{product.description || 'Pas de description détaillée.'}</p>
                    <div className="product-price-full">{product.price || 'N/A'} Ar</div>

                    {/* Affichage du stock */}
                    {typeof product.stock === 'number' ? (
                        product.stock > 0 ? (
                            <div className="product-stock-status available">En stock ({product.stock})</div>
                        ) : (
                            <div className="product-stock-status out-of-stock">Hors stock</div>
                        )
                    ) : (
                        <div className="product-stock-status">Stock inconnu</div>
                    )}

                    <ul className="product-features-list">
                        <h3>Caractéristiques clés:</h3>
                        {/* Assurez-vous que product.details (si utilisé) est un tableau de chaînes de caractères */}
                        {product.details && Array.isArray(product.details) && product.details.length > 0 ? (
                            product.details.map((detail, index) => (
                                <li key={index}>{detail}</li>
                            ))
                        ) : (
                            <li>Aucune caractéristique supplémentaire disponible.</li>
                        )}
                    </ul>

                    <div className="product-actions">
                        <button className="add-to-cart-btn">Ajouter au panier</button>
                        {/* Ajoutez d'autres boutons comme "Acheter maintenant" si nécessaire */}
                    </div>
                </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <Link to="/products" className="back-button">Retour à la liste des produits</Link>
            </div>
        </div>
    );
}

export default ProductDetailPage;