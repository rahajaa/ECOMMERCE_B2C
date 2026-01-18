// Frontend/src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError("Veuillez remplir tous les champs.");
            return;
        }

        try {
            await login(email, password); // Appel via AuthContext
            navigate('/account'); // Redirection après succès
        } catch (err) {
            if (err.response) {
                // Erreur du serveur
                const msg = err.response.data.detail || 'Nom d\'utilisateur ou mot de passe incorrect.';
                setError(msg);
            } else {
                // Erreur réseau ou autre
                setError('Erreur réseau. Vérifiez votre connexion.');
            }
        }
    };

    return (
        <div className="auth-page-container">
            <div className="auth-form-card">
                <h1 className="auth-title">Connexion</h1>
                <p className="auth-subtitle">Accédez à votre compte e-commerce</p>

                {error && <div className="message-error">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>Email :</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Votre email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Mot de passe :</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Votre mot de passe"
                            required
                        />
                    </div>
                    <button type="submit" className="auth-button">Se Connecter</button>
                </form>

                <p className="auth-link-text">
                    Pas encore de compte ? <Link to="/register">Inscrivez-vous</Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
