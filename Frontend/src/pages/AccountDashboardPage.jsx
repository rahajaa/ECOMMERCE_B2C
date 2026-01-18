// Frontend/src/pages/AccountDashboardPage.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axiosConfig';
import { Link } from 'react-router-dom';

function AccountDashboardPage() {
    const { user, logout } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await api.get('/orders/'); // endpoint backend pour les commandes
                setOrders(response.data);
            } catch (err) {
                console.error("Erreur récupération commandes:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="dashboard-container">
            <h1>Bonjour, {user?.username || user?.email}</h1>
            <button onClick={logout} className="logout-button">Déconnexion</button>

            <section className="dashboard-section">
                <h2>Mon Profil</h2>
                <p>Email: {user?.email}</p>
                <p>Nom d'utilisateur: {user?.username}</p>
                <Link to="/profile">Modifier mon profil</Link>
            </section>

            <section className="dashboard-section">
                <h2>Mes Commandes</h2>
                {loading ? (
                    <p>Chargement des commandes...</p>
                ) : orders.length === 0 ? (
                    <p>Aucune commande pour le moment.</p>
                ) : (
                    <ul>
                        {orders.map((order) => (
                            <li key={order.id}>
                                Commande #{order.id} - {order.status} - Total: {order.total} Ar
                                <Link to={`/orders/${order.id}`}>Voir détails</Link>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
}

export default AccountDashboardPage;
