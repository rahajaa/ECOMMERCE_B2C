import React from 'react';
import { useParams } from 'react-router-dom';

function InvestorDetailPage() {
    const { name } = useParams();

    // Données des investisseurs avec contenu professionnel
    const investorsData = {
        "Investisseur Alpha": {
            fullName: "Investisseur Alpha Capital - Partenaire Stratégique",
            description: "Investisseur Alpha Capital est un fonds d'investissement de premier plan, dédié à l'accélération de la croissance des entreprises innovantes et à fort potentiel sur les marchés émergents, avec un accent particulier sur Madagascar. Leur approche va au-delà du simple financement, offrant un accompagnement stratégique et un accès à un vaste réseau d'experts pour maximiser la valeur et l'impact de leurs partenaires.",
            focusAreas: [
                "Financement de capital-risque pour les startups technologiques et les entreprises en expansion.",
                "Conseil en stratégie de marché et développement commercial international.",
                "Facilitation de partenariats clés et d'opportunités de synergie au sein de leur portefeuille."
            ],
            contactEmail: "partenariat@investoralpha.mg",
            imageUrl: "https://placehold.co/150x150/28a745/ffffff?text=InvAlpha" // Remplacez par une vraie image professionnelle
        },
        "Investisseur Beta": {
            fullName: "Investisseur Beta Ventures - Catalyseur de Croissance",
            description: "Investisseur Beta Ventures est un groupe d'investissement dynamique qui se concentre sur les entreprises à fort potentiel de transformation, en particulier celles qui opèrent dans les secteurs de l'e-commerce, de la logistique et des services numériques. Ils apportent non seulement un capital significatif, mais aussi une expertise opérationnelle approfondie pour aider les entreprises à passer à l'échelle supérieure et à conquérir de nouveaux marchés.",
            focusAreas: [
                "Investissements ciblés dans les infrastructures logistiques et les plateformes e-commerce.",
                "Accompagnement dans l'optimisation des chaînes d'approvisionnement et l'efficacité opérationnelle.",
                "Soutien à l'innovation et à l'adoption de nouvelles technologies pour une croissance durable."
            ],
            contactEmail: "relations@investorbeta.mg",
            imageUrl: "https://placehold.co/150x150/28a745/ffffff?text=InvBeta" // Remplacez par une vraie image professionnelle
        }
    };

    const investor = investorsData[name];

    if (!investor) {
        return (
            <main className="service-page-container">
                <h1 className="section-title">Investisseur non trouvé</h1>
                <p className="service-intro-paragraph">Désolé, les informations pour l'investisseur "{name}" ne sont pas disponibles.</p>
            </main>
        );
    }

    return (
        <main className="service-page-container collaborator-investor-page">
            <h1 className="section-title">Notre Investisseur : {investor.fullName}</h1>
            <div className="service-page-content collaborator-investor-content">
                <div className="collaborator-investor-header">
                    <img src={investor.imageUrl} alt={`Profil de ${investor.fullName}`} className="collaborator-investor-image" />
                    <p className="service-intro-paragraph">{investor.description}</p>
                </div>

                <h2 className="service-subsection-title">Domaines d'Intérêt et Impact :</h2>
                <ul className="service-features-list">
                    {investor.focusAreas.map((item, index) => (
                        <li key={index} className="service-feature-item">{item}</li>
                    ))}
                </ul>

                <p className="service-call-to-action">
                    Pour en savoir plus sur {investor.fullName} ou pour des opportunités d'investissement :
                </p>
                <div className="contact-info-block service-contact-block">
                    <p>Email: <a href={`mailto:${investor.contactEmail}`}>{investor.contactEmail}</a></p>
                </div>
            </div>
        </main>
    );
}

export default InvestorDetailPage;
