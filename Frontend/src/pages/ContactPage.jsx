import React, { useState } from 'react';
import '../styles/contact.css'; // Assurez-vous de créer ce fichier CSS

function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState(''); // 'success', 'error', 'sending'

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        // Ici, vous enverriez les données à votre API Django
        // Exemple avec un endpoint factice :
        // const YOUR_CONTACT_API_ENDPOINT = 'http://127.0.0.1:8000/api/contact/';
        // try {
        //     const response = await fetch(YOUR_CONTACT_API_ENDPOINT, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             // Ajoutez un jeton CSRF si nécessaire pour Django
        //             // 'X-CSRFToken': getCsrfToken(),
        //         },
        //         body: JSON.stringify(formData)
        //     });
        //
        //     if (response.ok) {
        //         setStatus('success');
        //         setFormData({ name: '', email: '', subject: '', message: '' }); // Vider le formulaire
        //     } else {
        //         setStatus('error');
        //         const errorData = await response.json();
        //         console.error('Erreur lors de l\'envoi:', errorData);
        //     }
        // } catch (error) {
        //     console.error('Erreur réseau ou autre:', error);
        //     setStatus('error');
        // }

        // Simulation d'envoi pour le prototype:
        setTimeout(() => {
            console.log('Données du formulaire envoyées (simulé):', formData);
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 1500);
    };

    return (
        <div className="contact-page-container">
            <h1 className="contact-title">Contactez-nous</h1>
            <p className="contact-intro">Nous sommes là pour répondre à toutes vos questions et préoccupations. N'hésitez pas à nous envoyer un message.</p>

            <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                    <label htmlFor="name">Nom Complet</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="subject">Sujet</label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="message">Votre Message</label>
                    <textarea
                        id="message"
                        name="message"
                        rows="6"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>

                <button type="submit" className="submit-button" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Envoi...' : 'Envoyer le Message'}
                </button>

                {status === 'success' && (
                    <p className="form-status success">Votre message a été envoyé avec succès !</p>
                )}
                {status === 'error' && (
                    <p className="form-status error">Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.</p>
                )}
            </form>

            <div className="contact-info-section">
                <h2>Nos Coordonnées</h2>
                <div className="contact-details">
                    <div className="contact-item">
                        <h3>Adresse</h3>
                        <p>Madagascar, Toamasina, Atsinanana</p>
                    </div>
                    <div className="contact-item">
                        <h3>Email</h3>
                        <p>contact@betoo.mg</p>
                    </div>
                    <div className="contact-item">
                        <h3>Téléphone</h3>
                        <p>+261 34 00 000 00</p>
                    </div>
                    <div className="contact-item">
                        <h3>Heures d'Ouverture</h3>
                        <p>Lun - Ven: 9h00 - 18h00</p>
                        <p>Sam: 9h00 - 13h00</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactPage;