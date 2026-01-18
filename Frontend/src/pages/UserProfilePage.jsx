// src/pages/UserProfilePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/user-profil.css';
function UserProfilePage() {
    // Ceci est un exemple de données utilisateur.
    // En réalité, ces données proviendraient de votre backend après connexion.
    const user = {
        name: "Jean Dupont",
        email: "jean.dupont@exemple.com",
        role: "Client", // Ou "Collaborateur", "Investisseur"
        memberSince: "Janvier 2023",
        profileImage: "https://via.placeholder.com/150/007bff/FFFFFF?text=JD" // Exemple d'image
    };

    return (
        <div className="account-page-container">
            <h2 className="account-page-title">Mon Compte</h2>

            <div className="account-profile-card">
                <img 
                    src={user.profileImage} 
                    alt="Photo de profil" 
                    className="collaborator-investor-image" 
                />
                <h3>{user.name}</h3>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Rôle:</strong> {user.role}</p>
                <p><strong>Membre depuis:</strong> {user.memberSince}</p>
                <Link to="/edit-profile" className="account-profile-link">Modifier le Profil</Link>
            </div>

            <div className="account-dashboard-grid">
                <Link to="/orders" className="dashboard-item-card">
                    <h3 className="dashboard-item-title">Mes Commandes</h3>
                    <p>Voir l'historique de vos achats.</p>
                </Link>
                <Link to="/cart" className="dashboard-item-card">
                    <h3 className="dashboard-item-title">Mon Panier</h3>
                    <p>Gérer les articles dans votre panier.</p>
                </Link>
                <Link to="/settings" className="dashboard-item-card">
                    <h3 className="dashboard-item-title">Paramètres</h3>
                    <p>Gérer vos préférences de compte.</p>
                </Link>
                {/* Ajoutez d'autres liens spécifiques au rôle (ex: "Mes Projets" pour les collaborateurs) */}
                {user.role === 'Collaborateur' && (
                     <Link to="/my-projects" className="dashboard-item-card">
                        <h3 className="dashboard-item-title">Mes Projets</h3>
                        <p>Gérer vos projets soumis.</p>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default UserProfilePage;