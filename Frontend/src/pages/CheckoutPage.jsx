import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Correction ici : on récupère 'cartItems' car c'est le nom envoyé par CartPage
  const { cartItems, total } = location.state || { cartItems: [], total: 0 };
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    phone: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleConfirmOrder = async () => {
    if (!formData.address || !formData.phone) {
      alert("Veuillez remplir l'adresse et le téléphone.");
      return;
    }

    setIsProcessing(true);
    try {
      // 1. Appel au backend (Vérifie bien que cette URL existe dans ton urls.py Django)
      const response = await axios.post('http://10.96.131.99:9000/api/payments/create-checkout-session/', {
        amount: total, 
        items: cartItems,
        shipping_details: formData // Optionnel : envoyer les infos de livraison
      });

      // 2. Redirection vers Stripe
      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (err) {
      console.error("Erreur de paiement:", err);
      alert("Erreur lors de l'initialisation du paiement. Vérifie que le backend tourne !");
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <h2>Votre panier est vide</h2>
        <button onClick={() => navigate('/products')} className="button-primary">Retour aux produits</button>
      </div>
    );
  }

  return (
    <main className="checkout-page" style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Finaliser ma commande</h1>
      
      <div className="checkout-container" style={{ display: 'flex', gap: '40px', marginTop: '30px' }}>
        
        {/* Formulaire de livraison */}
        <div className="shipping-form" style={{ flex: 2, background: '#f9f9f9', padding: '25px', borderRadius: '10px' }}>
          <h2>Adresse de livraison</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
            <input 
              type="text" name="address" placeholder="Adresse complète" 
              onChange={handleInputChange} style={inputStyle} 
            />
            <input 
              type="text" name="city" placeholder="Ville" 
              onChange={handleInputChange} style={inputStyle} 
            />
            <input 
              type="text" name="phone" placeholder="Numéro de téléphone" 
              onChange={handleInputChange} style={inputStyle} 
            />
          </div>
        </div>
        
        {/* Récapitulatif et Bouton Stripe */}
        <div className="order-summary" style={{ flex: 1, border: '2px solid #eee', padding: '25px', borderRadius: '10px', height: 'fit-content' }}>
          <h2 style={{ borderBottom: '1px solid #eee', paddingBottom: '15px' }}>Récapitulatif</h2>
          <div style={{ margin: '20px 0' }}>
            {cartItems.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span>{item.name} (x{item.quantity})</span>
                <span>{(item.price * item.quantity).toLocaleString()} Ar</span>
              </div>
            ))}
          </div>
          
          <div style={{ borderTop: '2px solid #333', paddingTop: '15px', marginBottom: '25px' }}>
            <h3 style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.4em' }}>
              <span>Total:</span>
              <span style={{ color: '#007bff' }}>{total.toLocaleString()} Ar</span>
            </h3>
          </div>
          
          <button 
            className="confirm-order"
            onClick={handleConfirmOrder}
            disabled={isProcessing}
            style={{ 
              width: '100%', 
              padding: '18px', 
              backgroundColor: isProcessing ? '#ccc' : '#6772E5', // Couleur Stripe Purple
              color: 'white', 
              border: 'none', 
              borderRadius: '6px',
              cursor: isProcessing ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
              fontSize: '1.1em',
              transition: 'background 0.3s'
            }}
          >
            {isProcessing ? 'Connexion à Stripe...' : 'Payer avec Stripe'}
          </button>
          <p style={{ fontSize: '0.8em', color: '#666', marginTop: '15px', textAlign: 'center' }}>
             Paiement sécurisé via Stripe
          </p>
        </div>
      </div>
    </main>
  );
}

const inputStyle = {
  padding: '12px',
  borderRadius: '5px',
  border: '1px solid #ddd',
  fontSize: '1em'
};

export default CheckoutPage;