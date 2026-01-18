// Frontend/src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import '../styles/auth.css';
function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (password !== confirmPassword) {
            setError('Les mots de passe ne correspondent pas.');
            return;
        }

        try {
            await api.post('/accounts/register/', {
                email,
                password,
                password2: confirmPassword
            });
            setSuccess('Inscription réussie ! Vous pouvez maintenant vous connecter.');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setTimeout(() => navigate('/login'), 1500);
        } catch (err) {
            if (err.response) {
                setError(err.response.data.email || err.response.data.password || 'Erreur lors de l\'inscription.');
            } else {
                setError('Erreur réseau. Vérifiez votre connexion.');
            }
        }
    };

    return (
        <div className="auth-page-container">
            <div className="auth-form-card">
                <h1 className="auth-title">Inscription</h1>
                <p className="auth-subtitle">Créez votre compte BeToo</p>

                {error && <div className="message-error">{error}</div>}
                {success && <div className="message-success">{success}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>Email :</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Mot de passe :</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Confirmer le mot de passe :</label>
                        <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="auth-button">S'inscrire</button>
                </form>

                <p>
                    Déjà un compte ? <Link to="/login">Connectez-vous</Link>
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;
