// src/pages/FAQPage.jsx
import React from 'react';

function FAQPage() {
    const faqs = [
        {
            question: "Qu'est-ce que BeToo ?",
            answer: "BeToo est une plateforme e-commerce et de services qui connecte les consommateurs aux produits et services innovants à Madagascar, tout en offrant une plateforme aux créateurs et entreprises."
        },
        {
            question: "Comment puis-je vendre mes produits/services sur BeToo ?",
            answer: "Vous pouvez vous inscrire en tant que vendeur/prestataire de services via notre page d'inscription. Une fois votre compte validé, vous aurez accès à un tableau de bord pour gérer vos offres."
        },
        {
            question: "Comment effectuer une commande ?",
            answer: "Parcourez nos catégories de produits ou services, ajoutez les articles à votre panier, puis suivez les étapes de paiement sécurisé pour finaliser votre commande."
        },
        {
            question: "Quels sont les modes de paiement acceptés ?",
            answer: "Nous acceptons les paiements par carte bancaire (Visa, Mastercard), Mobile Money (Orange Money, Mvola) et virement bancaire pour les transactions importantes."
        },
        {
            question: "Puis-je retourner un produit ?",
            answer: "Oui, la plupart des produits peuvent être retournés dans les 7 jours suivant la réception, à condition qu'ils soient dans leur état d'origine. Veuillez consulter notre politique de retour pour plus de détails."
        },
    ];

    return (
        <div style={{ maxWidth: '900px', margin: '40px auto', padding: '30px', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
            <h2 className="section-title">Foire Aux Questions (FAQ)</h2>
            <p style={{ textAlign: 'center', marginBottom: '30px', color: '#555' }}>Trouvez rapidement les réponses à vos questions les plus fréquentes.</p>

            <div className="faq-list">
                {faqs.map((faq, index) => (
                    <div key={index} className="faq-item" style={{ marginBottom: '20px', padding: '20px', border: '1px solid #eee', borderRadius: '8px', background: '#f9f9f9' }}>
                        <h3 style={{ fontSize: '1.2em', color: '#007bff', marginBottom: '10px' }}>{faq.question}</h3>
                        <p style={{ fontSize: '0.95em', color: '#666' }}>{faq.answer}</p>
                    </div>
                ))}
            </div>
            <p style={{ textAlign: 'center', marginTop: '30px', color: '#555' }}>Vous n'avez pas trouvé votre réponse ? <a href="/contact" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>Contactez-nous directement !</a></p>
        </div>
    );
}
export default FAQPage;