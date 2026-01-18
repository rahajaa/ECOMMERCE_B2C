// Frontend/src/admin/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import VerifyPayment from './VerifyPayment';

export default function Dashboard() {

    const [orders, setOrders] = useState([]);
    const [payments, setPayments] = useState([]);

    const fetchOrders = async () => {
        const res = await api.get('orders/');
        setOrders(res.data);
    };

    const fetchPayments = async () => {
        const res = await api.get('admin/payments/');
        setPayments(res.data);
    };

    useEffect(() => {
        fetchOrders();
        fetchPayments();
    }, []);

    const handlePaymentValidated = (id) => {
        setPayments(payments.filter(p => p.id !== id));
    };

    return (
        <div>
            <h1>Dashboard BeToo</h1>

            <section>
                <h2>Commandes</h2>
                {orders.map(o => (
                    <div key={o.id}>#{o.id} — {o.total} Ar — {o.status}</div>
                ))}
            </section>

            <section>
                <h2>Paiements à vérifier</h2>
                {payments.map(p => (
                    <VerifyPayment key={p.id} payment={p} onValidated={handlePaymentValidated} />
                ))}
            </section>
        </div>
    );
}
