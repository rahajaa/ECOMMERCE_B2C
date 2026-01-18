import React from 'react';
import { Link } from 'react-router-dom';

function ITPage() {
    return (
        <main className="service-page-container">
            <h1 className="section-title">Services Informatiques</h1>
            <div className="service-page-content">
                <p className="service-intro-paragraph">
                    BeToo vous accompagne dans l'optimisation de votre infrastructure informatique et le développement de solutions numériques innovantes. Que vous soyez une entreprise ou un particulier, nos experts sont à votre écoute.
                </p>
                <h2 className="service-subsection-title">Nos Offres :</h2>
                <ul className="service-features-list">
                    <li className="service-feature-item"><strong>Développement Web et Mobile :</strong> Création de sites internet, applications mobiles et plateformes e-commerce sur mesure.</li>
                    <li className="service-feature-item"><strong>Maintenance et Support IT :</strong> Dépannage, installation de logiciels, gestion de réseaux et assistance technique.</li>
                    <li className="service-feature-item"><strong>Cybersécurité :</strong> Audit de sécurité, mise en place de protections, formation et gestion des incidents.</li>
                    <li className="service-feature-item"><strong>Conseil et Audit IT :</strong> Optimisation de vos systèmes, stratégie numérique et accompagnement dans vos projets technologiques.</li>
                    <li className="service-feature-item"><strong>Formation Informatique :</strong> Cours et ateliers personnalisés pour maîtriser les outils et technologies actuelles.</li>
                </ul>
                <p className="service-outro-paragraph">
                    Nous nous engagons à fournir des solutions informatiques performantes et sécurisées, adaptées à vos besoins spécifiques et à votre budget.
                </p>
                <p className="service-call-to-action">
                    Pour toute demande ou projet spécifique, n'hésitez pas à nous contacter.
                </p>
                <div className="contact-info-block service-contact-block">
                    <p>Contactez notre équipe IT :</p>
                    <p>Email: <a href="mailto:it@betoo.mg">it@betoo.mg</a></p>
                    <p>Téléphone: <a href="tel:+261340000003">+261 34 00 000 03</a></p>
                </div>
            </div>
        </main>
    );
}

export default ITPage;
