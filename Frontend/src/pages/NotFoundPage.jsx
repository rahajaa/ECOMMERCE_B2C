// X:\ecommerce_Projects\BeToo_Frontend\src\pages\NotFoundPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
    return (
        <div className="not-found-container">
            <h1 className="not-found-title">404</h1>
            <p className="not-found-message">Page Non Trouvée</p>
            <p className="not-found-suggestion">
                Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
            </p>
            <Link to="/" className="button-primary not-found-button">Retour à l'accueil</Link>
        </div>
    );
}

export default NotFoundPage;
