import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// URL de base pour le backend
const API_BASE_URL = 'http://10.96.131.99:9000/api';

function CartPage() {
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await axios.get(`${API_BASE_URL}/cart/`); 
                
                // CORRECTION : Si Django renvoie un objet avec une clé 'items', on prend 'items'
                // Sinon on s'assure que c'est un tableau
                const data = response.data.items ? response.data.items : (Array.isArray(response.data) ? response.data : []);
                setCartItems(data);
            } catch (err) {
                console.error("Erreur lors du chargement du panier :", err);
                setError("Impossible de charger le panier. Vérifiez votre connexion.");
                setCartItems([]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCartItems();
    }, []);

    // CORRECTION : Sécurité sur le reduce pour éviter le crash si cartItems n'est pas encore chargé
    const total = Array.isArray(cartItems) 
        ? cartItems.reduce((acc, item) => acc + (Number(item.price) * Number(item.quantity)), 0) 
        : 0;

    const handleQuantityChange = async (id, newQuantity) => {
        const updatedQuantity = Math.max(1, newQuantity);
        try {
            await axios.patch(`${API_BASE_URL}/cart/update/${id}/`, { quantity: updatedQuantity });
            
            setCartItems(prevItems =>
                prevItems.map(item =>
                    item.id === id ? { ...item, quantity: updatedQuantity } : item
                )
            );
            setMessage('Quantité mise à jour !');
        } catch (err) {
            console.error("Erreur de mise à jour :", err);
            setMessage('Échec de la mise à jour.');
        }
        setTimeout(() => setMessage(''), 3000);
    };

    const handleRemoveItem = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/cart/remove/${id}/`);
            setCartItems(prevItems => prevItems.filter(item => item.id !== id));
            setMessage('Article supprimé.');
        } catch (err) {
            console.error("Erreur de suppression :", err);
            setMessage("Échec de la suppression.");
        }
        setTimeout(() => setMessage(''), 3000);
    };

    const handleCheckout = () => {
        if (!cartItems || cartItems.length === 0) {
            setMessage('Votre panier est vide.');
            setTimeout(() => setMessage(''), 3000);
            return;
        }
        navigate('/checkout', { state: { cartItems, total } });
    };

    if (isLoading) return <div style={{ textAlign: 'center', padding: '50px' }}>Chargement du panier...</div>;
    if (error) return <div style={{ textAlign: 'center', color: 'red', padding: '50px' }}>{error}</div>;

    return (
        <div className="content-wrapper" style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="cart-page-title">Mon Panier</h2>
            {message && (
                <div style={{ padding: '10px', marginBottom: '20px', borderRadius: '5px', backgroundColor: message.includes('Échec') ? '#f8d7da' : '#d4edda', color: message.includes('Échec') ? '#721c24' : '#155724' }}>
                    {message}
                </div>
            )}

            {cartItems.length === 0 ? (
                <div className="no-data-message" style={{ textAlign: 'center', padding: '30px' }}>
                    Votre panier est vide. <Link to="/products" style={{ color: '#007bff' }}>Faire du shopping</Link>
                </div>
            ) : (
                <>
                    <div className="cart-items-list" style={{ marginBottom: '30px' }}>
                        {cartItems.map(item => (
                            <div key={item.id} className="cart-item-card" style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '15px', border: '1px solid #eee', borderRadius: '8px', marginBottom: '15px', background: '#fcfcfc' }}>
                                <img 
                                    src={item.imageUrl?.startsWith('http') ? item.imageUrl : `http://10.96.131.99:9000${item.imageUrl}`} 
                                    alt={item.name} 
                                    style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '5px' }} 
                                />
                                <div style={{ flexGrow: '1' }}>
                                    <h3 style={{ fontSize: '1.2em', margin: '0 0 5px 0' }}>{item.name}</h3>
                                    <p style={{ margin: '0', color: '#666' }}>{Number(item.price).toLocaleString()} Ar</p>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)} style={{ padding: '5px 10px', cursor: 'pointer' }}>-</button>
                                    <span style={{ fontWeight: 'bold', minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                                    <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)} style={{ padding: '5px 10px', cursor: 'pointer' }}>+</button>
                                </div>
                                <span style={{ fontWeight: 'bold', color: '#28a745', minWidth: '100px', textAlign: 'right' }}>
                                    {(item.price * item.quantity).toLocaleString()} Ar
                                </span>
                                <button onClick={() => handleRemoveItem(item.id)} style={{ background: '#dc3545', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer' }}>X</button>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary" style={{ textAlign: 'right', borderTop: '2px solid #eee', paddingTop: '20px' }}>
                        <h3 style={{ fontSize: '1.5em' }}>Total: <span style={{ color: '#007bff' }}>{total.toLocaleString()} Ar</span></h3>
                        <button 
                            className="button-primary" 
                            style={{ marginTop: '20px', padding: '12px 25px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1.1em' }}
                            onClick={handleCheckout}
                        >
                            Passer à la Commande
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default CartPage;