import React from 'react';

function InstallationsElectriquesPage() {
    return (
        <main className="service-page-container">
            <h1 className="section-title">Service d'Installations Électriques</h1>
            <div className="service-page-content">
                <p className="service-intro-paragraph">
                    BeToo propose des services complets de conception et de réalisation d'installations électriques, adaptés aux besoins des résidences privées et des entreprises. Nous garantissons des solutions sûres, fiables et conformes aux normes en vigueur à Madagascar.
                </p>
                <h2 className="service-subsection-title">Nos Compétences :</h2>
                <ul className="service-features-list">
                    <li className="service-feature-item"><strong>Conception de Systèmes :</strong> Étude et planification de schémas électriques optimisés pour la consommation et la sécurité.</li>
                    <li className="service-feature-item"><strong>Installations Neuves :</strong> Mise en place de réseaux électriques complets pour les constructions neuves, du câblage aux raccordements finaux.</li>
                    <li className="service-feature-item"><strong>Rénovation et Mise aux Normes :</strong> Modernisation des installations existantes pour améliorer la sécurité, l'efficacité énergétique et la conformité aux réglementations.</li>
                    <li className="service-feature-item"><strong>Éclairage et Domotique :</strong> Intégration de solutions d'éclairage intelligentes et de systèmes domotiques pour un confort accru et des économies d'énergie.</li>
                    <li className="service-feature-item"><strong>Tableaux Électriques :</strong> Installation et maintenance de tableaux de distribution électrique, disjoncteurs et protections.</li>
                </ul>
                <p className="service-outro-paragraph">
                    Notre équipe d'électriciens certifiés met son expertise à votre service pour des projets de toute envergure, en veillant à la qualité de l'exécution et au respect des délais.
                </p>
                <p className="service-call-to-action">
                    Contactez-nous pour discuter de votre projet et obtenir un devis personnalisé.
                </p>
                <div className="contact-info-block service-contact-block">
                    <p>Contactez-nous pour un devis gratuit :</p>
                    <p>Email: <a href="mailto:electricite@betoo.mg">electricite@betoo.mg</a></p>
                    <p>Téléphone: <a href="tel:+261340000002">+261 34 00 000 02</a></p>
                </div>
            </div>
        </main>
    );
}

export default InstallationsElectriquesPage;
