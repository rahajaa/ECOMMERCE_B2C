import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { addToCart } from '../api/cart';

const API_BASE_URL = 'http://10.96.131.99:9000/api';

function ProductDetailPage() {
    const { productSlug } = useParams();
    const [product, setProduct] = useState(null);
    const [mainImg, setMainImg] = useState('');
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/products/${productSlug}/`);
                setProduct(res.data);
                setMainImg(res.data.main_image);
                setLoading(false);
            } catch (err) {
                console.error("Erreur chargement produit:", err);
                setLoading(false);
            }
        };
        fetchDetails();
    }, [productSlug]);

    // --- LOGIQUE DE STOCK ---
    // On récupère le stock de la première variante (ou 0 si rien n'est trouvé)
    const maxStock = product?.variants?.[0]?.stock || 0;

    const handleAddToCartClick = async () => {
        if (!product.variants || product.variants.length === 0) {
            alert("Erreur : Ce produit n'a pas de variantes disponibles.");
            return;
        }

        try {
            const variantId = product.variants[0].id; 
            await addToCart(variantId, quantity);
            alert("✅ Succès ! Produit ajouté au panier.");
        } catch (err) {
            console.error("Détail de l'erreur API:", err.response?.data);
            alert(`Erreur : ${err.response?.data?.detail || "Vérifiez votre connexion"}`);
        }
    };

    if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Chargement...</div>;
    if (!product) return <div style={{ textAlign: 'center', padding: '50px' }}>Produit non trouvé.</div>;

    return (
        <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
            <Link to="/products" style={{ display: 'block', marginBottom: '20px', color: '#007bff', textDecoration: 'none' }}>
                ← Retour aux produits
            </Link>
            
            <div style={{ display: 'flex', gap: '50px', flexWrap: 'wrap' }}>
                
                {/* --- GALERIE --- */}
                <div style={{ flex: '1', minWidth: '300px' }}>
                    <div 
                        style={{ width: '100%', height: '450px', borderRadius: '15px', overflow: 'hidden', cursor: 'zoom-in', border: '1px solid #eee' }}
                        onClick={() => setIsFullScreen(true)}
                    >
                        <img src={mainImg} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
                        {product.images?.map((imgObj, idx) => (
                            <div 
                                key={idx}
                                onClick={() => setMainImg(imgObj.image)}
                                style={{ 
                                    width: '70px', height: '70px', borderRadius: '8px', overflow: 'hidden', cursor: 'pointer',
                                    border: mainImg === imgObj.image ? '2px solid #007bff' : '1px solid #ddd'
                                }}
                            >
                                <img src={imgObj.image} alt="gallery" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- INFOS --- */}
                <div style={{ flex: '1', minWidth: '300px' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{product.name}</h1>
                    <p style={{ color: '#007bff', fontWeight: 'bold' }}>{product.category?.name}</p>
                    <p style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '20px 0' }}>
                        {Number(product.price).toLocaleString()} Ar
                    </p>
                    
                    {/* Statut du stock */}
                    <p style={{ color: maxStock > 0 ? '#28a745' : '#dc3545', fontWeight: '500' }}>
                        {maxStock > 0 ? `In Stock (${maxStock} disponibles)` : 'Rupture de stock'}
                    </p>

                    <p style={{ lineHeight: '1.6', color: '#444', marginTop: '15px' }}>{product.description}</p>
                    
                    <div style={{ marginTop: '30px', display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                        
                        {/* Sélecteur de quantité bridé par maxStock */}
                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '5px', backgroundColor: '#f8f9fa' }}>
                            <button 
                                onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                                style={{ padding: '10px 15px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
                            > - </button>
                            
                            <span style={{ padding: '0 15px', fontWeight: 'bold', minWidth: '40px', textAlign: 'center' }}>
                                {quantity}
                            </span>
                            
                            <button 
                                onClick={() => setQuantity(Math.min(maxStock, quantity + 1))} 
                                disabled={quantity >= maxStock}
                                style={{ 
                                    padding: '10px 15px', border: 'none', background: 'none', 
                                    cursor: quantity >= maxStock ? 'not-allowed' : 'pointer', 
                                    fontSize: '1.2rem', color: quantity >= maxStock ? '#ccc' : '#000' 
                                }}
                            > + </button>
                        </div>

                        <button 
                            onClick={handleAddToCartClick}
                            disabled={maxStock === 0}
                            style={{ 
                                padding: '15px 40px', 
                                backgroundColor: maxStock === 0 ? '#6c757d' : '#28a745', 
                                color: 'white', border: 'none', borderRadius: '8px', 
                                cursor: maxStock === 0 ? 'not-allowed' : 'pointer', 
                                fontSize: '1.1rem', fontWeight: 'bold' 
                            }}
                        >
                            {maxStock > 0 ? '🛒 Ajouter au panier' : 'Indisponible'}
                        </button>
                    </div>

                    {quantity >= maxStock && maxStock > 0 && (
                        <p style={{ color: '#fd7e14', fontSize: '0.9rem', marginTop: '10px' }}>
                            ⚠️ Quantité maximale atteinte pour ce produit.
                        </p>
                    )}
                </div>
            </div>

            {/* --- MODAL PLEIN ÉCRAN --- */}
            {isFullScreen && (
                <div 
                    onClick={() => setIsFullScreen(false)}
                    style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                >
                    <img src={mainImg} alt="fullscreen" style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain' }} />
                    <span style={{ position: 'absolute', top: '20px', right: '30px', color: 'white', fontSize: '40px' }}>&times;</span>
                </div>
            )}
        </div>
    );
}

export default ProductDetailPage;