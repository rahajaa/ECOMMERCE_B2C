// PATH: frontend/src/pages/CheckoutPayment.jsx

import { useState } from "react";
import API from "../services/api";

export default function CheckoutPayment({ order }) {

  const [provider, setProvider] = useState("mvola");
  const [instructions, setInstructions] = useState(null);

  const startPayment = async () => {
    const res = await API.post("payments/start/", {
      order_id: order.id,
      provider: provider
    });

    setInstructions(res.data);
  };

  return (
    <div>
      <h2>Paiement Mobile Money</h2>

      <select onChange={e => setProvider(e.target.value)}>
        <option value="mvola">MVola</option>
        <option value="orange">Orange Money</option>
        <option value="airtel">Airtel Money</option>
      </select>

      <button onClick={startPayment}>
        Afficher instructions
      </button>

      {instructions && (
        <div>
          <p>Envoyer à : {instructions.send_to}</p>
          <p>Montant : {instructions.amount} Ar</p>
        </div>
      )}

      <SubmitTransaction order={order} provider={provider}/>
    </div>
  );
}
