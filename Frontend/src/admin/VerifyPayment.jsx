// Frontend/src/admin/VerifyPayment.jsx
import React from 'react';
import api from '../api/axiosConfig';

export default function VerifyPayment({ payment, onValidated }) {

    const validate = async () => {
        try {
            await api.post('admin/payments/validate/', { id: payment.id });
            alert('Paiement validé');
            if(onValidated) onValidated(payment.id);
        } catch (error) {
            alert('Erreur lors de la validation du paiement.');
            console.error(error);
        }
    };

    return (
        <div style={{border: '1px solid #ccc', margin: '5px', padding: '5px'}}>
            <p>Commande #{payment.order} — {payment.provider}</p>
            <p>Tx: {payment.transaction_id}</p>
            <button onClick={validate}>Valider</button>
        </div>
    );
}
