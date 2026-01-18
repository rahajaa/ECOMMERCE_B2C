// X:\ecommerce_Projects\BeToo_Frontend\src\pages\AboutPage.jsx

import React from 'react';
import '../styles/about.css';
function AboutPage() {
    // Les données de l'équipe sont statiques pour cet exemple, car il n'y a pas d'API explicite pour elles.
    const teamMembers = [
        { name: 'John Doe', title: 'PDG & Fondateur', image: 'https://placehold.co/120x120/007bff/ffffff?text=JD' },
        { name: 'Jane Smith', title: 'Directrice des Opérations', image: 'https://placehold.co/120x120/28a745/ffffff?text=JS' },
        { name: 'Pierre Blanc', title: 'Chef de Produit', image: 'https://placehold.co/120x120/ffc107/333333?text=PB' },
    ];

    return (
        <main className="about-page-container">
            <section className="about-hero">
                <h1>À Propos de Be_Too Ecoserv</h1>
                <p>
                    Nous sommes une entreprise engagée pour un avenir durable à Madagascar,
                    combinant innovation, qualité et responsabilité environnementale.
                </p>
            </section>

            <section className="about-mission">
                <h2 className="section-title">Notre Mission</h2>
                <p>
                    Notre mission est de fournir des produits et services écologiques et innovants qui répondent
                    aux besoins de nos clients tout en contribuant positivement à la société et à l'environnement.
                    Nous nous engageons à soutenir le développement local et à promouvoir des pratiques durables.
                </p>
            </section>

            <section className="about-values">
                <h2 className="section-title">Nos Valeurs</h2>
                <div className="values-grid">
                    <div className="value-item">
                        <h3>Innovation</h3>
                        <p>Nous recherchons constamment de nouvelles solutions pour améliorer nos produits et services, en adoptant les technologies les plus récentes et les pratiques les plus efficaces.</p>
                    </div>
                    <div className="value-item">
                        <h3>Qualité</h3>
                        <p>L'excellence est au cœur de tout ce que nous faisons. Nous nous engageons à offrir des produits et services de la plus haute qualité, fiables et durables.</p>
                    </div>
                    <div className="value-item">
                        <h3>Durabilité</h3>
                        <p>Nous sommes profondément engagés envers l'environnement. Nos opérations et nos offres sont conçues pour minimiser l'impact écologique et promouvoir un avenir plus vert.</p>
                    </div>
                    <div className="value-item">
                        <h3>Engagement Local</h3>
                        <p>Nous valorisons les ressources et les talents de Madagascar. Nous travaillons en étroite collaboration avec les communautés locales pour soutenir leur développement économique et social.</p>
                    </div>
                </div>
            </section>

            <section className="about-team">
                <h2 className="section-title">Notre Équipe</h2>
                <div className="team-members">
                    {teamMembers.map((member, index) => (
                        <div className="team-member-card" key={index}>
                            <img
                                src={member.image}
                                alt={member.name}
                                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/120x120/cccccc/333333?text=Team'; }}
                            />
                            <h4>{member.name}</h4>
                            <p>{member.title}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="about-future">
                <h2 className="section-title">Notre Vision pour l'Avenir</h2>
                <p>
                    Nous aspirons à être un leader incontournable dans les solutions durables à Madagascar,
                    en étendant notre impact positif à travers l'innovation continue et des partenariats solides.
                    Nous sommes déterminés à construire un héritage de prospérité et de responsabilité pour les générations futures.
                </p>
            </section>
        </main>
    );
}

export default AboutPage;
