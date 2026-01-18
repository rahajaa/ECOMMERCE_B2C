import React, { useState } from 'react';

function CheckoutPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'card'
  });

  return (
    <main className="checkout-page">
      <h1>Finaliser ma commande</h1>
      <div className="checkout-container">
        <div className="shipping-form">
          <h2>Adresse de livraison</h2>
          {/* Formulaire */}
        </div>
        <div className="order-summary">
          <h2>Récapitulatif</h2>
          {/* Produits, total */}
          <button className="confirm-order">Confirmer la commande</button>
        </div>
      </div>
    </main>
  );
}

export default CheckoutPage;
