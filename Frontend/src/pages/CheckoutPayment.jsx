// PATH: frontend/src/pages/CheckoutPayment.jsx
import { useState } from "react";
import axios from "axios"; // Ou ton service API

export default function CheckoutPayment({ order, total }) {
  const [provider, setProvider] = useState("stripe"); // Stripe par défaut
  const [instructions, setInstructions] = useState(null);

  const startPayment = async () => {
    if (provider === "stripe") {
      try {
        // On appelle la vue Stripe qu'on a créée dans Django
        const res = await axios.post("http://10.96.131.99:9000/api/payments/create-checkout-session/", {
          order_id: order.id,
          amount: total
        });
        if (res.data.url) {
          window.location.href = res.data.url; // Redirection Stripe
        }
      } catch (err) {
        alert("Erreur Stripe");
      }
    } else {
      // Logique Mobile Money (ton code actuel)
      const res = await axios.post("http://10.96.131.99:9000/api/payments/start/", {
        order_id: order.id,
        provider: provider
      });
      setInstructions(res.data);
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>Choisir votre mode de paiement</h2>

      <select 
        value={provider} 
        onChange={e => setProvider(e.target.value)}
        style={{ padding: '10px', width: '100%', marginBottom: '20px' }}
      >
        <option value="stripe">Carte Bancaire (Stripe)</option>
        <option value="mvola">MVola</option>
        <option value="orange">Orange Money</option>
        <option value="airtel">Airtel Money</option>
      </select>

      <button 
        onClick={startPayment}
        style={{ padding: '12px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '100%' }}
      >
        {provider === "stripe" ? "Payer maintenant" : "Afficher les instructions"}
      </button>

      {instructions && provider !== "stripe" && (
        <div style={{ marginTop: '20px', background: '#f0f0f0', padding: '15px' }}>
          <p><strong>Instructions :</strong></p>
          <p>Envoyer à : {instructions.send_to}</p>
          <p>Montant : {instructions.amount} Ar</p>
          <p>Référence à indiquer : {order.id}</p>
        </div>
      )}
    </div>
  );
}