// src/pages/CartPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import de useNavigate pour la redirection
import axios from 'axios'; // Pour les appels API futurs

function CartPage() {
    const [cartItems, setCartItems] = useState([]); // Initialisez avec un tableau vide
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Hook pour la navigation

    useEffect(() => {
        // Dans une vraie application, vous chargeriez le panier depuis une API ici
        const fetchCartItems = async () => {
            try {
                setIsLoading(true);
                setError(null);
                // >>> REMPLACEZ par l'URL de votre API de panier si elle existe <<<
                const response = await axios.get('http://127.0.0.1:8000/api/cart/'); 
                setCartItems(response.data); // Supposons que la réponse est un tableau d'articles
                setMessage('');
            } catch (err) {
                console.error("Erreur lors du chargement du panier :", err);
                setError("Impossible de charger le panier. Vérifiez votre connexion.");
                setCartItems([]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCartItems();

        // Exemple de données initiales si vous n'avez pas encore d'API panier
        // Supprimez ceci une fois que votre API fonctionne
        // setCartItems([
        //     { id: 1, name: 'Produit Innovant X', price: 50000, quantity: 2, imageUrl: 'https://via.placeholder.com/100x80?text=ProduitX' },
        //     { id: 2, name: 'Service Digital Y', price: 150000, quantity: 1, imageUrl: 'https://via.placeholder.com/100x80?text=ServiceY' },
        // ]);
        // setIsLoading(false);
    }, []);

    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleQuantityChange = async (id, newQuantity) => {
        const updatedQuantity = Math.max(1, newQuantity);
        try {
            // Envoyer la mise à jour à l'API du backend
            await axios.patch(`http://127.0.0.1:8000/api/cart/update/${id}/`, { quantity: updatedQuantity });
            
            setCartItems(prevItems =>
                prevItems.map(item =>
                    item.id === id ? { ...item, quantity: updatedQuantity } : item
                )
            );
            setMessage('Quantité mise à jour !');
        } catch (err) {
            console.error("Erreur lors de la mise à jour de la quantité :", err);
            setMessage('Échec de la mise à jour de la quantité.');
        }
        setTimeout(() => setMessage(''), 3000);
    };

    const handleRemoveItem = async (id) => {
        try {
            // Envoyer la suppression à l'API du backend
            await axios.delete(`http://127.0.0.1:8000/api/cart/remove/${id}/`);
            setCartItems(prevItems => prevItems.filter(item => item.id !== id));
            setMessage('Article supprimé du panier.');
        } catch (err) {
            console.error("Erreur lors de la suppression de l'article :", err);
            setMessage("Échec de la suppression de l'article.");
        }
        setTimeout(() => setMessage(''), 3000);
    };

    const handleCheckout = async () => {
        // Logic for proceeding to checkout
        if (cartItems.length === 0) {
            setMessage('Votre panier est vide. Ajoutez des articles avant de commander.');
            setTimeout(() => setMessage(''), 3000);
            return;
        }

        try {
            // Exemple : créer une commande via l'API de votre backend
            // Assurez-vous que votre API accepte un POST à /api/orders/ ou /api/checkout/
            const response = await axios.post('http://127.0.0.1:8000/api/orders/create/', {
                items: cartItems.map(item => ({ product_id: item.id, quantity: item.quantity })),
                total_amount: total,
                // Ajoutez d'autres données nécessaires comme l'adresse de livraison, etc.
            });
            setMessage('Commande passée avec succès ! Redirection...');
            console.log("Commande créée :", response.data);
            // Vider le panier après commande réussie (ou l'API le fera)
            setCartItems([]); 
            // Rediriger vers une page de confirmation ou l'historique des commandes
            navigate('/orders'); 
        } catch (err) {
            console.error("Erreur lors du passage de la commande :", err.response ? err.response.data : err.message);
            setMessage('Échec du passage de la commande. Veuillez réessayer.');
            if (err.response && err.response.data) {
                // Affiche les erreurs spécifiques du backend si elles sont fournies
                console.log("Détails de l'erreur du backend:", err.response.data);
            }
        }
        setTimeout(() => setMessage(''), 5000);
    };

    if (isLoading) {
        return <div className="loading-message">Chargement du panier...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="content-wrapper"> {/* Ajout de content-wrapper ici pour le padding global de la page */}
            <h2 className="cart-page-title">Mon Panier</h2>
            {message && <div className={`system-message ${error ? 'message-error' : 'message-success'}`}>{message}</div>}

            {cartItems.length === 0 ? (
                <div className="no-data-message">Votre panier est vide. <Link to="/products" className="auth-link">Commencez vos achats !</Link></div>
            ) : (
                <>
                    <div className="cart-items-list" style={{ marginBottom: '30px' }}>
                        {cartItems.map(item => (
                            <div key={item.id} className="cart-item-card" style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '15px', border: '1px solid #eee', borderRadius: '8px', marginBottom: '15px', background: '#fcfcfc' }}>
                                <img src={item.imageUrl || 'https://via.placeholder.com/100x80?text=Produit'} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '5px' }} />
                                <div style={{ flexGrow: '1' }}>
                                    <h3 style={{ fontSize: '1.2em', margin: '0 0 5px 0', color: '#333' }}>{item.name}</h3>
                                    <p style={{ margin: '0', color: '#666' }}>Prix unitaire: {item.price.toFixed(2)} Ar</p>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)} className="button-secondary" style={{ padding: '5px 10px', fontSize: '0.9em' }}>-</button>
                                    <span style={{ fontSize: '1.1em', fontWeight: 'bold' }}>{item.quantity}</span>
                                    <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)} className="button-secondary" style={{ padding: '5px 10px', fontSize: '0.9em' }}>+</button>
                                </div>
                                <span style={{ fontSize: '1.1em', fontWeight: 'bold', color: '#28a745' }}>{(item.price * item.quantity).toFixed(2)} Ar</span>
                                <button onClick={() => handleRemoveItem(item.id)} className="button-secondary" style={{ background: '#dc3545', borderColor: '#dc3545', padding: '8px', borderRadius: '5px', color: 'white' }}>X</button>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary" style={{ textAlign: 'right', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                        <h3 style={{ fontSize: '1.5em', color: '#333' }}>Total: <span style={{ color: '#007bff' }}>{total.toFixed(2)} Ar</span></h3>
                        <button 
                            className="button-primary" 
                            style={{ marginTop: '20px', padding: '12px 25px' }}
                            onClick={handleCheckout} // Ajout de la fonction onClick
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