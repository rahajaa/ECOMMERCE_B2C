import React from 'react';

function BlogPage() {
    const blogPosts = [
        {
            id: 1,
            title: "L'impact de l'e-commerce à Madagascar",
            date: "15 Juin 2024",
            excerpt: "Découvrez comment le commerce électronique transforme l'économie locale et les habitudes de consommation à Madagascar.",
            link: "#" // Lien vers l'article complet
        },
        {
            id: 2,
            title: "Les énergies renouvelables : une solution pour Madagascar ?",
            date: "10 Mai 2024",
            excerpt: "Analyse des défis et opportunités des énergies solaires et éoliennes dans le contexte malgache.",
            link: "#"
        },
        {
            id: 3,
            title: "Cybersécurité : Protéger vos données en ligne",
            date: "28 Avril 2024",
            excerpt: "Conseils pratiques pour sécuriser vos informations personnelles et professionnelles sur internet.",
            link: "#"
        }
    ];

    return (
        <main>
            <div className="service-page-container"> {/* Réutiliser le conteneur pour un style cohérent */}
                <h1 className="section-title">Notre Blog</h1>
                <p className="service-intro-paragraph" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    Restez informé des dernières actualités, conseils et analyses de BeToo.
                </p>
                <div style={{ display: 'grid', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
                    {blogPosts.map(post => (
                        <div key={post.id} style={{ backgroundColor: '#f8faff', padding: '1.5rem', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                            <h2 style={{ fontSize: '1.5rem', color: '#007bff', marginBottom: '0.5rem' }}>{post.title}</h2>
                            <p style={{ fontSize: '0.9rem', color: '#777', marginBottom: '1rem' }}>{post.date}</p>
                            <p style={{ fontSize: '1rem', color: '#444', marginBottom: '1.5rem' }}>{post.excerpt}</p>
                            <a href={post.link} style={{ color: '#0056b3', textDecoration: 'none', fontWeight: '600' }}>Lire la suite &rarr;</a>
                        </div>
                    ))}
                </div>
                <p className="service-call-to-action" style={{ marginTop: '3rem' }}>
                    Plus d'articles à venir très bientôt !
                </p>
            </div>
        </main>
    );
}

export default BlogPage;
