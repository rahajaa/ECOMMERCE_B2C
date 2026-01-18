// PATH: frontend/src/components/SubmitTransaction.jsx

import { useState } from "react";
import API from "../services/api";

export default function SubmitTransaction({ order, provider }) {

  const [tx, setTx] = useState("");
  const [phone, setPhone] = useState("");

  const submit = async () => {
    await API.post("payments/submit/", {
      order_id: order.id,
      provider: provider,
      tx: tx,
      phone: phone,
      amount: order.total
    });

    alert("Paiement envoyé pour vérification");
  };

  return (
    <div>
      <h3>Confirmation paiement</h3>

      <input
        placeholder="Numéro téléphone"
        onChange={e => setPhone(e.target.value)}
      />

      <input
        placeholder="ID transaction"
        onChange={e => setTx(e.target.value)}
      />

      <button onClick={submit}>
        Confirmer
      </button>
    </div>
  );
}
