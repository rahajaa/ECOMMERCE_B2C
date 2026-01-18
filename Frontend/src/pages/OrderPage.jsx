// src/pages/OrderPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function OrderPage() {
    // Exemple de données de commande. En réalité, elles viendraient d'une API.
    const [orders, setOrders] = useState([
        {
            id: 'ORD001',
            date: '2025-07-10',
            status: 'Livré',
            total: 250000,
            items: [
                { name: 'Produit Innovant X', quantity: 2, price: 50000 },
                { name: 'Service Digital Y', quantity: 1, price: 150000 },
            ]
        },
        {
            id: 'ORD002',
            date: '2025-07-15',
            status: 'En cours',
            total: 80000,
            items: [
                { name: 'Gadget Futurisq', quantity: 1, price: 80000 },
            ]
        },
    ]);

    return (
        <div className="orders-page-container">
            <h2 className="orders-page-title">Mes Commandes</h2>

            {orders.length === 0 ? (
                <div className="no-data-message">Vous n'avez pas encore passé de commande. <Link to="/products" className="auth-link">Découvrez nos produits !</Link></div>
            ) : (
                <div className="orders-list">
                    {orders.map(order => (
                        <div key={order.id} className="order-item-card" style={{ padding: '20px', border: '1px solid #eee', borderRadius: '8px', marginBottom: '20px', background: '#fcfcfc' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                                <h3 style={{ fontSize: '1.3em', margin: '0', color: '#007bff' }}>Commande #{order.id}</h3>
                                <span style={{ fontSize: '1em', color: '#555' }}>Date: {order.date}</span>
                            </div>
                            <div style={{ marginBottom: '15px' }}>
                                <p style={{ margin: '5px 0', fontWeight: 'bold' }}>Statut: 
                                    <span style={{ color: order.status === 'Livré' ? '#28a745' : '#ffc107', marginLeft: '8px' }}>{order.status}</span>
                                </p>
                                <p style={{ margin: '5px 0', fontWeight: 'bold' }}>Total: <span style={{ color: '#007bff' }}>{order.total.toFixed(2)} Ar</span></p>
                            </div>

                            <div className="order-details-items">
                                <h4 style={{ fontSize: '1.1em', marginBottom: '10px', color: '#444' }}>Articles commandés :</h4>
                                <ul>
                                    {order.items.map((item, idx) => (
                                        <li key={idx} style={{ marginBottom: '5px', fontSize: '0.95em', color: '#666' }}>
                                            {item.name} ({item.quantity}x) - {(item.price * item.quantity).toFixed(2)} Ar
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div style={{ textAlign: 'right', marginTop: '20px' }}>
                                <Link to={`/orders/${order.id}`} className="button-primary" style={{ padding: '8px 15px', fontSize: '0.9em' }}>Voir les détails</Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default OrderPage;