// src/components/Footer.jsx (Créez ce fichier si vous n'en avez pas)
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';function Footer() {
    return (
        <footer className="main-footer">
            <div className="footer-content-wrapper">
                <div className="footer-section about-us">
                    <h3>BeToo E-commerce</h3>
                    <p>Votre partenaire de confiance pour des produits technologiques de qualité et des services professionnels à Madagascar.</p>
                    <p>Innovation, fiabilité et service client au cœur de nos valeurs.</p>
                </div>

                <div className="footer-section quick-links">
                    <h3>Liens Rapides</h3>
                    <ul>
                        <li><Link to="/">Accueil</Link></li>
                        <li><Link to="/products">Produits</Link></li>
                        <li><Link to="/services">Services</Link></li>
                        <li><Link to="/about">À Propos</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>

                <div className="footer-section contact-info">
                    <h3>Contactez-nous</h3>
                    <p>Adresse: [Votre Adresse Physique ici]</p>
                    <p>Téléphone: +261 [Votre Numéro]</p>
                    <p>Email: contact@betoo.mg</p>
                    <p>Horaires: Lun-Ven, 9h-17h</p>
                </div>

                <div className="footer-section legal-info">
                    <h3>Informations Légales</h3>
                    <p>NIF: [Votre numéro NIF]</p>
                    <p>STAT: [Votre numéro STAT]</p>
                    <p>RCS: [Votre numéro RCS]</p>
                    <p>Capital Social: [Votre Capital Social]</p>
                    <p>&copy; {new Date().getFullYear()} BeToo E-commerce. Tous droits réservés.</p>
                </div>

                {/* Ajoutez une section pour les réseaux sociaux si vous le souhaitez */}
                <div className="footer-section social-media">
                    <h3>Suivez-nous</h3>
                    <div className="social-icons">
                        {/* Remplacez par de vraies icônes et liens */}
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;