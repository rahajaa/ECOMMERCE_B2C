import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function CollaboratorDetailPage() {
    const { name } = useParams();
    const [collaborator, setCollaborator] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        // Données simulées des collaborateurs
        const simulatedCollaborators = {
            "Fy": {
                name: "Fy",
                type: "Artisanat / Mode",
                description: "Fy est un collectif d'artisans locaux spécialisés dans la création de bijoux et d'accessoires de mode uniques, valorisant les matériaux naturels de Madagascar.",
                imageUrl: "https://placehold.co/180x180/007bff/ffffff?text=Fy",
                contact: "contact@fy.mg",
                website: "https://www.fy-madagascar.mg"
            },
            "Vavamborona": {
                name: "Vavamborona",
                type: "Édition / Livres Numériques",
                description: "Vavamborona est une maison d'édition numérique qui promeut la littérature malgache et les connaissances locales à travers des e-books accessibles à tous.",
                imageUrl: "https://placehold.co/180x180/007bff/ffffff?text=Vavamborona",
                contact: "info@vavamborona.mg",
                website: "https://www.vavamborona.mg"
            },
            "Anttah_Elec": {
                name: "Anttah Elec",
                type: "Installations Électriques",
                description: "Anttah Elec est notre partenaire expert en installations électriques résidentielles et industrielles, garantissant sécurité et conformité aux normes.",
                imageUrl: "https://placehold.co/180x180/007bff/ffffff?text=Anttah_Elec",
                contact: "contact@anttahelec.mg",
                website: "https://www.anttahelec.mg"
            },
            "El_Mec_Mah": {
                name: "El Mec Mah",
                type: "Maintenance Électromécanique",
                description: "El Mec Mah offre des services de maintenance et de réparation pour une large gamme d'équipements électromécaniques, assurant leur durabilité et performance.",
                imageUrl: "https://placehold.co/180x180/007bff/ffffff?text=El_Mec_Mah",
                contact: "service@elmecmah.mg",
                website: "https://www.elmecmah.mg"
            },
            "Voary_E-Book": {
                name: "Voary E-Book",
                type: "Édition / Contenu Numérique",
                description: "Voary E-Book est une plateforme dédiée à la diffusion de savoirs et de récits malgaches sous format numérique, contribuant à l'éducation et à la culture.",
                imageUrl: "https://placehold.co/180x180/007bff/ffffff?text=Voary_E-Book",
                contact: "support@voaryebook.mg",
                website: "https://www.voaryebook.mg"
            }
        };

        const foundCollaborator = simulatedCollaborators[name];

        setTimeout(() => {
            if (foundCollaborator) {
                setCollaborator(foundCollaborator);
            } else {
                setError(`Collaborateur "${name}" non trouvé.`);
            }
            setLoading(false);
        }, 300); // Simuler un délai de chargement
    }, [name]);

    if (loading) {
        return <main><div style={{ textAlign: 'center', padding: '50px' }}>Chargement du collaborateur...</div></main>;
    }

    if (error) {
        return <main><div className="message-error" style={{ margin: '20px' }}>{error}</div></main>;
    }

    if (!collaborator) {
        return <main><div style={{ textAlign: 'center', padding: '50px' }}>Collaborateur non disponible.</div></main>;
    }

    return (
        <main className="service-page-container"> {/* Réutiliser le style de conteneur */}
            <div className="collaborator-investor-header">
                <img
                    src={collaborator.imageUrl}
                    alt={collaborator.name}
                    className="collaborator-investor-image"
                    onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/180x180/007bff/ffffff?text=${collaborator.name.substring(0, 5)}` }}
                />
                <h1 className="section-title" style={{ marginBottom: '0.5rem', fontSize: '2.8rem' }}>{collaborator.name}</h1>
                <p style={{ fontSize: '1.2rem', color: '#007bff', fontWeight: '600' }}>{collaborator.type}</p>
            </div>

            <div className="service-page-content">
                <p className="service-intro-paragraph">
                    {collaborator.description}
                </p>

                <h2 className="service-subsection-title">Informations de Contact</h2>
                <ul className="service-features-list">
                    {collaborator.contact && (
                        <li className="service-feature-item">
                            <strong>Email :</strong> <a href={`mailto:${collaborator.contact}`}>{collaborator.contact}</a>
                        </li>
                    )}
                    {collaborator.website && (
                        <li className="service-feature-item">
                            <strong>Site Web :</strong> <a href={collaborator.website} target="_blank" rel="noopener noreferrer">{collaborator.website}</a>
                        </li>
                    )}
                </ul>

                <p className="service-call-to-action">
                    Nous sommes fiers de collaborer avec {collaborator.name} pour vous offrir des produits et services de qualité.
                </p>
            </div>
        </main>
    );
}

export default CollaboratorDetailPage;
