// X:\ecommerce_Projects\BeToo_Frontend\src\pages\OrderListPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';

function OrderListPage() {
    const orders = []; // Remplacez par vos données réelles de commandes (récupérées via API)

    return (
        <main className="orders-page-container">
            <h1 className="orders-page-title">Mes Commandes</h1>

            {orders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '30px', fontSize: '1.2rem', color: '#666' }}>
                    <p>Vous n'avez pas encore passé de commandes.</p>
                    <Link to="/products" className="account-profile-link" style={{ marginTop: '20px' }}>
                        Découvrir nos produits
                    </Link>
                </div>
            ) : (
                // Logique pour afficher la liste des commandes
                <div>
                    {/* Exemple d'affichage d'une commande */}
                    {/* {orders.map(order => (
                        <div key={order.id} className="order-item-card">
                            <h3>Commande #{order.id}</h3>
                            <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                            <p>Statut: {order.status}</p>
                            <Link to={`/orders/${order.id}`}>Voir les détails</Link>
                        </div>
                    ))} */}
                    <p style={{ textAlign: 'center', fontSize: '1.1rem', color: '#444' }}>Liste des commandes à implémenter ici...</p>
                </div>
            )}
        </main>
    );
}

export default OrderListPage;
